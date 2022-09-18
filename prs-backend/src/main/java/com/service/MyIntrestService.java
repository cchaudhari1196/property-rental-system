package com.service;

import com.entities.*;
import com.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MyIntrestService {


	@Autowired
	UserService userService;


	@Autowired
	PropertyService propertyService;

	public List<Property> findIntrestedProperties(int uId){
		List<Property> properties = propertyService.getIntrestingPropertiesByUser(uId);
		return properties;
	}

	public void addMyIntrest(Integer propertyId, Integer userId) throws Exception {
//		float price = mo.getTotalprice();
//		orderEntity.setAddress(mo.getAddress());
//		orderEntity.setContactno(mo.getO_phone());
//		orderEntity.setOstatus(mo.getOstatus());
//		orderEntity.setTotalprice(mo.getTotalprice());
//		orderEntity.setTotalprice(price);
//
//		User user = userRepo.getById(mo.getU_id());
//		orderEntity.setUser(user);
//
//		orderRepo.save(orderEntity);
//
//		List<Property> allProperties = productRepo.findAll();
//		Map<Integer, Property> productMap = new HashMap();
//		for(Property property : allProperties){
//			productMap.put(property.getP_id(), property);
//		}
//
//		List<Owner> allOwners = this.vendorRepo.findAll();
//		Map<Integer, Owner> vendorMap = new HashMap();
//		for(Owner owner : allOwners){
//			vendorMap.put(owner.getV_id(), owner);
//		}
//
//		for (OrderQuantity oq : mo.getProductsQuantity()){
//			IntrestedUserPropertyMapping intrestedUserPropertyMapping = new IntrestedUserPropertyMapping();
//			Property foundProperty = productMap.get(oq.getProduct_id());
//			intrestedUserPropertyMapping.setProduct(foundProperty);
//			intrestedUserPropertyMapping.setQuantity(oq.getQuantity());
//
//			intrestedUserPropertyMapping.setUser(orderEntity);
//			opMappingRepo.save(intrestedUserPropertyMapping);
//			orderEntity.addProductAssoc(intrestedUserPropertyMapping);
//		}
//		Admin admin = adminRepo.findById(1).get();
//		double priceAdminWants = (price / 1.1 ) * 0.1;
//		adminRepo.save(admin);
		return;
	}


	public void removeMyIntrest(Integer orderId, Integer userId){
//		User user = userRepo.getById(order.getUser().getU_id());
//
//
//		List<Property> properties = new ArrayList<>();
//		List<Owner> owners = new ArrayList<>();
//		for(IntrestedUserPropertyMapping mapping : order.getProductAssoc()){
//			Property prod = productRepo.getById(mapping.getProduct().getP_id());
//			prod.setPqty(prod.getPqty() + mapping.getQuantity());
//			properties.add(prod);
//
//			Owner owner = vendorRepo.getById(prod.getVdr().getV_id());
//			Float costOfProductOrdered = mapping.getProduct().getRent() * mapping.getQuantity();
//			owners.add(owner);
//		}
//
//		Admin admin = adminRepo.findById(1).get();
//
//		order.setOstatus("order_cancelled");
//
//		/*Save all data once everything is calculated. otherwise No data will be modified*/
//		adminRepo.save(admin);
//		productRepo.saveAll(properties);
//		vendorRepo.saveAll(owners);
//		userRepo.save(user);
//		orderRepo.save(order);
//
//		if(order instanceof HibernateProxy){
//			HibernateProxy orderProxy = (HibernateProxy) order;
//			order = (MyOrder) orderProxy.getHibernateLazyInitializer().getImplementation();
//		}
		return;
	}
}