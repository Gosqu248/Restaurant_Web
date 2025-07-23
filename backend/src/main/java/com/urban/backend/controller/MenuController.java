package com.urban.backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.urban.backend.dto.response.MenuDTO;
import com.urban.backend.exception.MenuServiceException;
import com.urban.backend.exception.ResourceNotFoundException;
import com.urban.backend.exception.ValidationException;
import com.urban.backend.model.Menu;
import com.urban.backend.service.MenuService;

import java.util.List;
import java.util.concurrent.TimeUnit;


@RestController
@RequestMapping("/api/menus")
@Slf4j
public class MenuController {
    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<MenuDTO>> getAllMenus() {
        return ResponseEntity.ok(menuService.getAllMenus());
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getMenuImage(@PathVariable Long id) {
        byte[] imageData = menuService.getMenuImage(id);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .cacheControl(CacheControl.maxAge(30, TimeUnit.MINUTES))
                .body(imageData);
    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Menu> addMenu(@RequestHeader("Authorization") String token,
                                        @RequestPart("menu") Menu menu,
                                        @RequestPart(value = "image", required = false) MultipartFile image) {
        return ResponseEntity.ok(menuService.addMenu(menu, image));
    }

    @PutMapping(value ="/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Menu> updateMenu(@RequestHeader("Authorization") String token,
                                           @PathVariable Long id,
                                           @RequestPart("menu") Menu menu,
                                           @RequestPart(value = "image", required = false) MultipartFile image) {
        return ResponseEntity.ok(menuService.updateMenu(id, menu, image));
    }


    @PutMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMenu(@RequestHeader(value = "Authorization", required = false) String token,
                                           @PathVariable Long id) {
        menuService.deleteMenu(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<String> handleValidationException(ValidationException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleNotFoundException(ResourceNotFoundException e) {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(MenuServiceException.class)
    public ResponseEntity<String> handleServiceException(MenuServiceException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }


}
