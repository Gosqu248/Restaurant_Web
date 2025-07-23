package com.urban.backend.dto.response;

import lombok.Data;
import com.urban.backend.enums.OrderStatus;

import java.time.ZonedDateTime;
import java.util.List;

@Data
public class OrderDTO {

    private Long id;
    private String deliveryTime;
    private List<OrderMenuDTO> orderMenus;
    private String paymentId;
    private String paymentMethod;
    private String comment;
    private OrderStatus status;
    private double totalPrice;
    private ZonedDateTime orderDate;

}
