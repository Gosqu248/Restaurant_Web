package com.urban.backend.service;

import com.urban.backend.dto.response.MenuDTO;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.urban.backend.exception.MenuServiceException;
import com.urban.backend.exception.ResourceNotFoundException;
import com.urban.backend.exception.ValidationException;
import com.urban.backend.model.Menu;
import com.urban.backend.repository.MenuRepository;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.Deflater;
import java.util.zip.Inflater;


@Service
@Slf4j
public class MenuService {
    private final MenuRepository menuRepository;
    private static final long MAX_IMAGE_SIZE = 10 * 1024 * 1024; //10MB
    private static final String[] ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/gif", "image/jpg", "image/webp"};


    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    @Transactional
    public List<MenuDTO> getAllMenus() {
        return menuRepository.findAllByAvailableTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Menu addMenu(Menu menu, MultipartFile image) {
        try {
            validateMenuItem(menu);
            if (image != null && !image.isEmpty()) {
                validateImage(image);
                menu.setImage(compressImage(image.getBytes()));
            }

            Menu savedMenu = menuRepository.save(menu);
            log.info("Successfully added new menu item: {}", savedMenu.getName());
            return savedMenu;

        } catch (IOException e) {
            log.error("Error processing image for menu item: {}", menu.getName(), e);
            throw new MenuServiceException("Failed to process image", e);
        }
    }

    public Menu updateMenu(Long id, Menu menuDetails, MultipartFile image) {
        return menuRepository.findById(id)
                .map(existingMenu -> {
                    try {
                        updateMenuFields(existingMenu, menuDetails);
                        if (image != null && !image.isEmpty()) {
                            validateImage(image);
                            existingMenu.setImage(compressImage(image.getBytes()));
                        }
                        Menu updatedMenu = menuRepository.save(existingMenu);
                        log.info("Successfully updated menu item: {}", updatedMenu.getName());
                        return updatedMenu;
                    } catch (IOException e) {
                        log.error("Error updating menu item: {}", id, e);
                        throw new MenuServiceException("Failed to update menu item", e);
                    }
                })
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));
    }

    public byte[] getMenuImage(Long id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));

        if (menu.getImage() == null) {
            return new byte[0];
        }

        return decompressImage(menu.getImage());
    }

    public void deleteMenu(Long id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));

        menu.setAvailable(false);
        menuRepository.save(menu);
    }

    private void validateMenuItem(Menu menu) {
        if (menu.getName() == null || menu.getName().trim().isEmpty()) {
            throw new ValidationException("Menu name cannot be empty");
        }
        if (menu.getPrice() <= 0) {
            throw new ValidationException("Price must be greater than 0");
        }
        if (menu.getCategory() == null || menu.getCategory().trim().isEmpty()) {
            throw new ValidationException("Category cannot be empty");
        }
    }

    private void validateImage(MultipartFile image) {
        if (image.getSize() > MAX_IMAGE_SIZE) {
            throw new ValidationException("Image size exceeds maximum allowed size of 5MB");
        }

        String contentType = image.getContentType();
        if (contentType == null || !Arrays.asList(ALLOWED_IMAGE_TYPES).contains(contentType.toLowerCase())) {
            throw new ValidationException("Invalid image format. Allowed formats: JPEG, PNG, GIF");
        }
    }

    private byte[] compressImage(byte[] imageData) throws IOException {
        Deflater deflater = new Deflater();
        deflater.setInput(imageData);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(imageData.length);
        byte[] buffer = new byte[4096];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        outputStream.close();
        return outputStream.toByteArray();
    }

    private byte[] decompressImage(byte[] compressedData) {
        Inflater inflater = new Inflater();
        inflater.setInput(compressedData);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(compressedData.length);
        byte[] buffer = new byte[4096];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
            return outputStream.toByteArray();
        } catch (Exception e) {
            log.error("Error decompressing image", e);
            throw new MenuServiceException("Failed to decompress image", e);
        }
    }

    private void updateMenuFields(Menu existingMenu, Menu menuDetails) {
        existingMenu.setName(menuDetails.getName());
        existingMenu.setCategory(menuDetails.getCategory());
        existingMenu.setIngredients(menuDetails.getIngredients());
        existingMenu.setPrice(menuDetails.getPrice());
    }

    private MenuDTO convertToDTO(Menu menu) {
        MenuDTO menuDTO = new MenuDTO();
        menuDTO.setId(menu.getId());
        menuDTO.setName(menu.getName());
        menuDTO.setPrice(menu.getPrice());
        menuDTO.setCategory(menu.getCategory());
        menuDTO.setIngredients(menu.getIngredients());
        menuDTO.setImageUrl(menu.getImageUrl());
        return menuDTO;
    }

}
