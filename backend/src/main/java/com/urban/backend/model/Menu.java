package com.urban.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "menu", schema = "taw_restaurant")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    private String ingredients;

    @Column(nullable = false)
    private double price;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] image;

    private String imageUrl;

    @Column(nullable = false)
    private Boolean available = true;

    @JsonIgnore
    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderMenu> orderMenus;

}
