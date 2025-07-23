package com.urban.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.security.Keys;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.urban.backend.model.User;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.expiration}")
    private Long expiration;

    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public String createToken(Map<String, Object> claims, String subject, Boolean shortExpiration) {
        long expirationTime = shortExpiration ? 300000 : expiration * 1000;

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS512)
                .compact();
    }

    public String generateToken(@NotNull User user, Boolean shortExpiration) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().name());
        claims.put("purpose", shortExpiration ? "password_reset" : "auth");
        return createToken(claims, user.getEmail(), shortExpiration);
    }

    public String extractSubjectFromToken(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, @NotNull Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();
        return claimsResolver.apply(claims);
    }

    public Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token, boolean isPasswordReset) {
        try {
            Claims claims = extractAllClaims(token);
            boolean isExpired = claims.getExpiration().before(new Date());
            String purpose = claims.get("purpose", String.class);
            return !isExpired && purpose.equals(isPasswordReset ? "password_reset" : "auth");
        } catch (SignatureException | IllegalArgumentException e) {
            return false;
        }
    }
}
