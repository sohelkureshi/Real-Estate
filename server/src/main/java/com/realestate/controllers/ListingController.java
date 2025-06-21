package com.realestate.controller;

import com.realestate.model.Listing;
import com.realestate.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listing")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;

    @PostMapping("/create")
    public ResponseEntity<Listing> createListing(
        @RequestBody Listing listing,
        @AuthenticationPrincipal User currentUser
    ) {
        return ResponseEntity.ok(listingService.createListing(listing, currentUser));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteListing(
        @PathVariable String id,
        @AuthenticationPrincipal User currentUser
    ) {
        listingService.deleteListing(id, currentUser);
        return ResponseEntity.ok("Listing deleted");
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<Listing> updateListing(
        @PathVariable String id,
        @RequestBody Listing listing,
        @AuthenticationPrincipal User currentUser
    ) {
        return ResponseEntity.ok(listingService.updateListing(id, listing, currentUser));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Listing> getListing(@PathVariable String id) {
        return ResponseEntity.ok(listingService.getListing(id));
    }

    @GetMapping("/get")
    public ResponseEntity<List<Listing>> getListings(
        @RequestParam(required = false) String searchTerm,
        @RequestParam(required = false) String type,
        @RequestParam(defaultValue = "9") int limit,
        @RequestParam(defaultValue = "0") int startIndex
    ) {
        return ResponseEntity.ok(listingService.getListings(searchTerm, type, limit, startIndex));
    }
}
