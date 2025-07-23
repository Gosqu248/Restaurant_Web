package com.urban.backend.controller;

import com.urban.backend.dto.response.AdminOrderDTO;
import com.urban.backend.dto.response.CreateOrderDTO;
import com.urban.backend.dto.response.OrderDTO;
import com.urban.backend.enums.OrderStatus;
import com.urban.backend.model.Order;
import com.urban.backend.security.JwtUtil;
import com.urban.backend.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final JwtUtil jwtUtil;

    public OrderController(OrderService orderService, JwtUtil jwtUtil) {
        this.orderService = orderService;
        this.jwtUtil = jwtUtil;
    }


    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        try {
            OrderDTO order = orderService.getOrderById(id);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user")
    public ResponseEntity<List<OrderDTO>> getUserOrders(@RequestHeader("Authorization") String token) {
        try {
            String subject = jwtUtil.extractSubjectFromToken(token.substring(7));
            List<OrderDTO> orders = orderService.getUserOrders(subject);
            return ResponseEntity.ok(orders);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<AdminOrderDTO>> getAllOrders(@RequestHeader("Authorization") String token) {
        try {
            List<AdminOrderDTO> orders = orderService.getAllOrders();
            return ResponseEntity.ok(orders);
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/createOrder")
    public ResponseEntity<Map<String, String>> createOrder(@RequestBody CreateOrderDTO order) {
        try {
            Order createdOrder = orderService.createOrder(order);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Order created with id: " + createdOrder.getId());
            response.put("orderId", createdOrder.getId().toString());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/changeStatus/{id}")
    public ResponseEntity<OrderStatus> changeOrderStatus(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        try {
            OrderStatus status = orderService.changeOrderStatus(id);
            return ResponseEntity.ok(status);
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
