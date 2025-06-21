package com.realestate.repository;
import com.realestate.model.Listing;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ListingRepository extends MongoRepository<Listing, String> {
    List<Listing> findByUserRef(String userRef);
}
