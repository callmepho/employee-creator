package anthony.employeecreator.employee;

import java.util.Date;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

public class EmployeeCreateDTO {
	@Getter
	@Setter
	@NotBlank
	private String firstName;
	
	@Getter
	@Setter
	private String middleName;
	
	@Getter
	@Setter
	@NotBlank
	private String lastName;
	
	@Getter
	@Setter
	@Email
	@NotBlank
	private String email;
	
	@Getter
	@Setter
	@NotBlank
	private String phone;
	
	@Getter
	@Setter
	@NotBlank
	private String address;
	
	@Getter
	@Setter
	@NotBlank
	private String contract;
	
	@Getter
	@Setter
	@NotNull
	private Date startDate;
	
	@Getter
	@Setter
	@Nullable
	private Date finishDate;
	
	@Getter
	@Setter
	@NotBlank
	private String onGoing;
	
	@Getter
	@Setter
	@NotBlank
	private String type;
	
	@Getter
	@Setter
	@NotBlank
	private String hours;
	
	public EmployeeCreateDTO(String firstName,String middleName,String lastName,
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
