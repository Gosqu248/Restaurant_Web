package com.urban.backend.dto.response;

import lombok.Data;

@Data
public class MenuDTO {
    private Long id;
    private String name;
    private String category;
    private String ingredients;
    private double price;
    private String imageUrl;
}
