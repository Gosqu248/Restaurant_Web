package com.urban.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String role;
}
