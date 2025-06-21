package com.realestate.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "listings")
public class Listing {
    @Id
    private String id;
    private String name;
    private String description;
    private String address;
    private double regularPrice;
    private double discountPrice;
    private int bathrooms;
    private int bedrooms;
    private boolean furnished;
    private boolean parking;
    private String type;
    private boolean offer;
    private List<String> imageUrls;
    private String userRef;
}
