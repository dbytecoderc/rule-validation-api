import { Response } from "express";

export const evaluate = (
	response: Response,
	data: any,
	key: any,
	rule: any,
	expression: boolean,
  mainDataKey: string = "data",
  condition: string = "nocontains"
) => {
  if(Object.prototype.toString.call(data) === "[object Object]" && condition === 'contains'){
    return response.status(400).json({
      message: `field ${mainDataKey} should be an array or string.`,
      status: "error",
      data: null,
    });
  }

	if (Object.prototype.toString.call(data) === "[object Object]") {
		const dataKeys = Object.keys(data);

		if (dataKeys.indexOf(key) === -1) {
			return response.status(400).json({
				message: `field ${key} is missing from ${mainDataKey}.`,
				status: "error",
				data: null,
			});
    }
    
		if (expression) {
			return response.status(200).json({
				message: `field ${key} successfully validated.`,
				status: "success",
				data: {
					validation: {
						error: false,
						field: key,
						field_value: data[key],
						condition: rule.condition,
						condition_value: rule.condition_value,
					},
				},
			});
		} else {
			return response.status(400).json({
				message: `field ${key} failed validation.`,
				status: "error",
				data: {
					validation: {
						error: true,
						field: key,
						field_value: data[key],
						condition: rule.condition,
						condition_value: rule.condition_value,
					},
				},
			});
		}
	}

	if (Array.isArray(data) && typeof +key === "number") {
		if (Math.sign(key) === -1 || isNaN(key) || !data[+key]) {
			return response.status(400).json({
				message: `field ${key} is missing from ${mainDataKey}.`,
				status: "error",
				data: null,
			});
		}

		if (expression) {
			return response.status(200).json({
				message: `field ${key} successfully validated.`,
				status: "success",
				data: {
					validation: {
						error: false,
						field: key,
						field_value: data[key],
						condition: rule.condition,
						condition_value: rule.condition_value,
					},
				},
			});
		} else {
			return response.status(400).json({
				message: `field ${key} failed validation.`,
				status: "error",
				data: {
					validation: {
						error: true,
						field: key,
						field_value: data[key],
						condition: rule.condition,
						condition_value: rule.condition_value,
					},
				},
			});
		}
	}

	if (typeof data === "string") {
		const stringArray = data.split("");
		if (Math.sign(key) === -1 || isNaN(key) || !stringArray[+key]) {
			return response.status(400).json({
				message: `field ${key} is missing from ${mainDataKey}.`,
				status: "error",
				data: null,
			});
    }

		if (expression) {
			return response.status(200).json({
				message: `field ${key} successfully validated.`,
				status: "success",
				data: {
					validation: {
						error: false,
						field: key,
						field_value: data[key],
						condition: rule.condition,
						condition_value: rule.condition_value,
					},
				},
			});
		} else {
			return response.status(400).json({
				message: `field ${key} failed validation.`,
				status: "error",
				data: {
					validation: {
						error: true,
						field: key,
						field_value: stringArray[key],
						condition: rule.condition,
						condition_value: rule.condition_value,
					},
				},
			});
		}
	}

	return response.status(400).json({
		message: `field ${key} is missing from ${data}.`,
		status: "error",
		data: null,
	});
};
