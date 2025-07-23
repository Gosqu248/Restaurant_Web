package com.urban.backend.dto.response;

import lombok.Getter;
import lombok.Setter;
import com.urban.backend.enums.OrderStatus;

import java.time.ZonedDateTime;
import java.util.List;

@Getter
@Setter
public class AdminOrderDTO {
    private Long id;
    private OrderStatus status;
    private ZonedDateTime orderDate;
    private String deliveryTime;
    private String paymentMethod;
    private String paymentId;
    private String comment;
    private double totalPrice;
    private List<OrderMenuDTO> orderMenus;
    private String userName;
    private String userEmail;
    private String userPhone;
}
