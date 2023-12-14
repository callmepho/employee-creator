package anthony.employeecreator.employee;

import java.util.Date;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

public class EmployeeUpdateDTO {
	@Getter
	@Setter
	private String firstName;
	
	@Getter
	@Setter
	private String middleName;
	
	@Getter
	@Setter
	private String lastName;
	
	@Getter
	@Setter
	@Email
	private String email;
	
	@Getter
	@Setter
	private String phone;
	
	@Getter
	@Setter
	private String address;
	
	@Getter
	@Setter
	private String contract;
	
	@Getter
	@Setter
	private Date startDate;
	
	@Getter
	@Setter
	private Date finishDate;
	
	@Getter
	@Setter
	private String onGoing;
	
	@Getter
	@Setter
	private String type;
	
	@Getter
	@Setter
	private String hours;
}
