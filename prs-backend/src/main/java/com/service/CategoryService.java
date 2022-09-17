package com.service;


import com.entities.Category;
import com.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService
{
	@Autowired
	private CategoryRepository categoryRepository;

	//register
	public Category registerCategory(Category category) 
	{
		// TODO Auto-generated method stub
			return categoryRepository.save(category);
	}

	public java.util.List<Category> allCategory() {
		// TODO Auto-generated method stub
		return categoryRepository.findAll();
	}

	public  Category getCategoryById(Integer id){
		return categoryRepository.getById(id);
	}
}

