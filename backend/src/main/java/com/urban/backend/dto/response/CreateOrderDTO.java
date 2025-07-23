package com.urban.backend.dto.response;

import lombok.Getter;
import lombok.Setter;
import com.urban.backend.enums.OrderStatus;

import java.util.List;

@Setter
@Getter
public class CreateOrderDTO {
    private OrderStatus status;
    private double totalPrice;
    private String deliveryTime;
    private String comment;
    private String paymentId;
    private String paymentMethod;
    private List<OrderMenuDTO> orderMenus;
    private Long userId;

}
