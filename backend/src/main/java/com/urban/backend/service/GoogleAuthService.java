package com.urban.backend.service;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import com.urban.backend.enums.Role;
import com.urban.backend.model.User;
import com.urban.backend.repository.UserRepository;
import com.urban.backend.security.JwtUtil;
import com.urban.backend.security.PasswordGenerator;

@Service
public class GoogleAuthService {
    private final UserRepository userRepository;
    private final JwtUtil jwtToken;

    public GoogleAuthService(UserRepository userRepository, JwtUtil jwtToken) {
        this.userRepository = userRepository;
        this.jwtToken = jwtToken;
    }


    public  String googleLogin(OAuth2User principal) {
        String email = principal.getAttribute("email");
        String name = principal.getAttribute("name");

        final User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name);
            newUser.setPassword(PasswordGenerator.generateRandomPassword());
            newUser.setRole(Role.user);
            return userRepository.save(newUser);
        });
        return jwtToken.generateToken(user, false);
    }
}
