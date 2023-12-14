package anthony.employeecreator.employee;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EmployeeService {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public List<Employee> findAll(){
		return this.employeeRepository.findAll();
	}
	
	public Optional<Employee> findById(Long id){
		Optional<Employee> foundEmployee = this.employeeRepository.findById(id);
		return foundEmployee;
	}
	
	public boolean deleteById(Long id){
		Optional<Employee> foundEmployee = this.employeeRepository.findById(id);
		if(foundEmployee.isPresent()) {
			this.employeeRepository.delete(foundEmployee.get());
			return true;
		}
		return false;
	}
	
	public Employee create(EmployeeCreateDTO data) {
		
		String firstName = data.getFirstName();
		String middleName =	data.getMiddleName();
		String lastName	= data.getLastName();
		String email = data.getEmail();
		String phone = data.getPhone();
		String address = data.getAddress();
		String contract = data.getContract();
		Date startDate = data.getStartDate();
		Date finishDate = data.getFinishDate();
		String onGoing	= data.getOnGoing();
		String type = data.getType();
		String hours = data.getHours();
		
		Employee newEmployee =  new Employee(firstName,middleName,lastName,email,phone,address,contract,startDate,finishDate,onGoing,type,hours);
		Employee created = this.employeeRepository.save(newEmployee);
		return created;
	}
	
public Optional<Employee> updateById(Long id, EmployeeUpdateDTO data) {
		
		Optional<Employee> foundEmployee = this.findById(id);
		
		if(foundEmployee.isPresent()) {
			Employee toUpdate = foundEmployee.get();
			
			if(data.getFirstName() != null) {
				toUpdate.setFirstName(data.getFirstName()); 
			}
			if(data.getMiddleName() != null) {
				toUpdate.setMiddleName(data.getMiddleName()); 
			}
			if(data.getLastName() != null) {
				toUpdate.setLastName(data.getLastName()); 
			}
			if(data.getEmail() != null) {
				toUpdate.setEmail(data.getEmail()); 
			}
			if(data.getPhone() != null) {
				toUpdate.setPhone(data.getPhone()); 
			}
			if(data.getAddress() != null) {
				toUpdate.setAddress(data.getAddress()); 
			}
			if(data.getContract() != null) {
				toUpdate.setContract(data.getContract());
			}
			if(data.getStartDate() != null) {
				toUpdate.setStartDate(data.getStartDate());
			}
			if(data.getFinishDate() != null) {
				toUpdate.setFinishDate(data.getFinishDate());
			}
			if(data.getOnGoing() != null) {
				toUpdate.setOnGoing(data.getOnGoing());
			}
			if(data.getType() != null) {
				toUpdate.setType(data.getType());
			}
			if(data.getHours() != null) {
				toUpdate.setHours(data.getHours());
			}
			
			
			Employee updatedEmployee = this.employeeRepository.save(toUpdate);
			
			return Optional.of(updatedEmployee);
			
		}
		
		return foundEmployee;
	}
}
