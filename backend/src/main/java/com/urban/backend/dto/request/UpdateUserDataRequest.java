package com.urban.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserDataRequest {

    private String name;
    private String phoneNumber;
}
