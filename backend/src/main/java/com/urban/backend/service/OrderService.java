package com.urban.backend.service;

import com.urban.backend.dto.response.AdminOrderDTO;
import com.urban.backend.dto.response.CreateOrderDTO;
import com.urban.backend.dto.response.OrderDTO;
import com.urban.backend.dto.response.OrderMenuDTO;
import com.urban.backend.enums.OrderStatus;
import com.urban.backend.model.Menu;
import com.urban.backend.model.Order;
import com.urban.backend.model.OrderMenu;
import com.urban.backend.model.User;
import com.urban.backend.repository.MenuRepository;
import com.urban.backend.repository.OrderRepository;
import com.urban.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    private final MenuRepository menuRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository, MenuRepository menuRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.menuRepository = menuRepository;
    }


    public OrderDTO getOrderById(Long id) {
        Order orders = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        return convertToOrderDTO(orders);
    }

    public List<OrderDTO> getUserOrders(String subject) {

        User user = userRepository.findByEmail(subject)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Order> orders = orderRepository.findByUserOrderByOrderDateDesc(user);
        return orders.stream()
                .map(this::convertToOrderDTO)
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public List<AdminOrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAllByOrderByOrderDateDesc();
        return orders.stream()
                .map(this::convertToAdminOrderDTO)
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public OrderStatus changeOrderStatus(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order with id " + id + " not found"));
        order.setStatus(OrderStatus.zapłacone);
        orderRepository.save(order);
        return order.getStatus();
    }


    public Order createOrder(CreateOrderDTO orderDTO) {
        try {
            Order order = new Order();
            order.setStatus(orderDTO.getStatus());
            order.setTotalPrice(orderDTO.getTotalPrice());
            order.setDeliveryTime(orderDTO.getDeliveryTime());
            order.setComment(orderDTO.getComment());
            order.setPaymentMethod(orderDTO.getPaymentMethod());
            order.setPaymentId(orderDTO.getPaymentId());

            User user = userRepository.findById(orderDTO.getUserId())
                    .orElseThrow(() -> new IllegalArgumentException("User with id " + orderDTO.getUserId() + " not found"));
            order.setUser(user);

            List<OrderMenu> orderMenus = new ArrayList<>();
            if (orderDTO.getOrderMenus() != null && !orderDTO.getOrderMenus().isEmpty()) {
                for (OrderMenuDTO orderMenuDTO : orderDTO.getOrderMenus()) {
                    OrderMenu orderMenu = new OrderMenu();
                    orderMenu.setQuantity(orderMenuDTO.getQuantity());
                    Menu menu = menuRepository.findById(orderMenuDTO.getMenuId())
                            .orElseThrow(() -> new IllegalArgumentException("Menu with id " + orderMenuDTO.getMenuId() + " not found"));
                    orderMenu.setMenu(menu);
                    orderMenu.setOrder(order);
                    orderMenus.add(orderMenu);
                }
            }
            order.setOrderMenus(orderMenus);
            return orderRepository.save(order);
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to create order", e);
        }

    }

    public OrderDTO convertToOrderDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();

        orderDTO.setId(order.getId());
        orderDTO.setDeliveryTime(order.getDeliveryTime());
        orderDTO.setPaymentId(order.getPaymentId());
        orderDTO.setPaymentMethod(order.getPaymentMethod());
        orderDTO.setComment(order.getComment());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setTotalPrice(order.getTotalPrice());
        orderDTO.setOrderDate(order.getOrderDate());
        List<OrderMenuDTO> orderMenusDTO = order.getOrderMenus().stream()
                .map(this::convertToOrderMenuDTO)
                .collect(Collectors.toCollection(ArrayList::new));
        orderDTO.setOrderMenus(orderMenusDTO);

        return orderDTO;
    }

    public OrderMenuDTO convertToOrderMenuDTO(OrderMenu orderMenu) {
        OrderMenuDTO orderMenuDTO = new OrderMenuDTO();
        orderMenuDTO.setQuantity(orderMenu.getQuantity());
        orderMenuDTO.setMenuId(orderMenu.getMenu().getId());
        return orderMenuDTO;
    }

    public AdminOrderDTO convertToAdminOrderDTO(Order order) {
        AdminOrderDTO adminOrderDTO = new AdminOrderDTO();
        adminOrderDTO.setId(order.getId());
        adminOrderDTO.setDeliveryTime(order.getDeliveryTime());
        adminOrderDTO.setPaymentId(order.getPaymentId());
        adminOrderDTO.setPaymentMethod(order.getPaymentMethod());
        adminOrderDTO.setComment(order.getComment());
        adminOrderDTO.setStatus(order.getStatus());
        adminOrderDTO.setTotalPrice(order.getTotalPrice());
        adminOrderDTO.setOrderDate(order.getOrderDate());
        adminOrderDTO.setUserName(order.getUser().getName());
        adminOrderDTO.setUserEmail(order.getUser().getEmail());
        adminOrderDTO.setUserPhone(order.getUser().getPhoneNumber());
        List<OrderMenuDTO> orderMenusDTO = order.getOrderMenus().stream()
                .map(this::convertToOrderMenuDTO)
                .collect(Collectors.toCollection(ArrayList::new));
        adminOrderDTO.setOrderMenus(orderMenusDTO);
        return adminOrderDTO;
    }
}
