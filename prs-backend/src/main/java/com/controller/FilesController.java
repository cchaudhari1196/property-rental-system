package com.controller;


import com.service.FilesStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.IOException;

@CrossOrigin("*")
@RestController
public class FilesController {

    @Autowired
    FilesStorageService storageService;

    @PostMapping("/upload_product_image")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        String originalFileName = file.getOriginalFilename();
        int indexOfLastFullStop = originalFileName.lastIndexOf(".");
        String fileName = originalFileName.substring(0, indexOfLastFullStop).replaceAll(" ","_") + ((int) (Math.random()*10000)) + originalFileName.substring(indexOfLastFullStop);
        storageService.save(file, fileName);
        String message = "Uploaded the file successfully: " + file.getOriginalFilename();
        String url = MvcUriComponentsBuilder
                .fromMethodName(FilesController.class, "getFile", fileName).build().toString();

        return ResponseEntity.status(HttpStatus.OK).body(url);
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"")
                .contentType(MediaType.IMAGE_PNG).body(file);
    }

    @DeleteMapping("/files/{filename:.+}")
    public ResponseEntity<String> deleteFile(@PathVariable String filename) {
        storageService.delete(filename);
        return new ResponseEntity<String>("Successfully Deleted image", HttpStatus.OK);
    }
}