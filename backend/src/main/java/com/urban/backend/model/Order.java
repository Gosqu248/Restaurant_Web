package com.urban.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.urban.backend.enums.OrderStatus;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "orders", schema = "taw_restaurant")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @Column(nullable = false)
    private double totalPrice;

    @Column(nullable = false)
    private String deliveryTime;

    private String comment;

    private String paymentId;

    @Column(nullable = false)
    private String paymentMethod;

    private ZonedDateTime orderDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<OrderMenu> orderMenus;

    @PrePersist
    protected void onCreate() {
        orderDate = ZonedDateTime.now(ZoneId.of("Europe/Warsaw"));
    }
}
