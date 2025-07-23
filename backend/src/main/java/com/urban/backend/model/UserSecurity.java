package com.urban.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(name = "user_security", schema = "taw_restaurant")
public class UserSecurity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int failedLoginAttempts = 0;

    private LocalDateTime lastFailedLoginAttempt;

    private String twoFactorCode;

    private Long twoFactorCodeExpireTime;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
