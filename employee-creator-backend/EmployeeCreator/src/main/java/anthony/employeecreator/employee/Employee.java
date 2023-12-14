package anthony.employeecreator.employee;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "employees")
public class Employee {
	
	@Getter
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	@Getter
	@Setter
	private String firstName;
	
	@Column
	@Getter
	@Setter
	private String middleName;
	
	@Column
	@Getter
	@Setter
	private String lastName;
	
	@Column
	@Getter
	@Setter
	private String email;
	
	@Column
	@Getter
	@Setter
	private String phone;
	
	@Column
	@Getter
	@Setter
	private String address;
	
	@Column
	@Getter
	@Setter
	private String contract;
	
	@Column
	@Getter
	@Setter
	private Date startDate;
	
	@Column
	@Getter
	@Setter
	private Date finishDate;
	
	@Column
	@Getter
	@Setter
	private String onGoing;
	
	@Column
	@Getter
	@Setter
	private String type;
	
	@Column
	@Getter
	@Setter
	private String hours;
	
	public Employee(){}
	
	public Employee(String firstName,String middleName,String lastName,
			String email,String phone,String address,String contract,Date startDate,
			Date finishDate,String onGoing,String type,String hours) {
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.contract = contract;
		this.startDate = startDate;
		this.finishDate = finishDate;
		this.onGoing = onGoing;
		this.type = type;
		this.hours = hours;
	}
}
