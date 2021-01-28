import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import { validator } from "./validator";
import { evaluate } from "./utils";

const app: Application = express();
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

app.get(
	"/",
	async (request: Request, response: Response): Promise<Response> => {
		return response.status(200).json({
			message: "My Rule-Validation API",
			status: "success",
			data: {
				name: "Oparah Dimkpa",
				github: "@dbytecoderc",
				email: "oparahdc@gmail.com",
				mobile: "+2348135266484",
				twitter: "@dbytecoderc",
			},
		});
	}
);

app.post(
	"/validate-rule",
	validator,
	async (request: Request, response: Response): Promise<Response> => {
		const { rule, data } = request.body;

    const ruleField: string[] = rule.field.split(".");

		switch (rule.condition) {
			case "eq":
				//If target data is in the root layer
				if (ruleField[0] && !ruleField[1] && ruleField.length <= 1) {
          console.log(typeof data === "string")
					return evaluate(
						response,
						data,
						ruleField[0],
						rule,
						eval(
							`${
								typeof data === "string"
									? data.split("")[ruleField[0]] == rule.condition_value
									: data[ruleField[0]] == rule.condition_value
							}`
						)
					);
				}

				if (ruleField[0] && ruleField[1] && !ruleField[2] && ruleField.length <= 2) {
					if (!data[ruleField[0]]) {
						return response.status(400).json({
							message: `field ${ruleField[0]} is missing from data.`,
							status: "error",
							data: null,
						});
					}

					return evaluate(
						response,
						data[ruleField[0]],
						ruleField[1],
						rule,
						eval(
							`${
								typeof data === "string"
									? data[ruleField[0]].split("")[ruleField[0]] ==
									  rule.condition_value
									: data[ruleField[0]][ruleField[1]] == rule.condition_value
							}`
						),
						ruleField[0]
					);
				}

				if (ruleField[0] && ruleField[1] && ruleField[2] && !ruleField[3] && ruleField.length <= 3) {
					if (!data[ruleField[0]]) {
						return response.status(400).json({
							message: `field ${ruleField[0]} is missing from data.`,
							status: "error",
							data: null,
						});
					}

					if (data[ruleField[0]] && !data[ruleField[0]][ruleField[1]]) {
						return response.status(400).json({
							message: `field ${ruleField[1]} is missing from ${ruleField[0]}.`,
							status: "error",
							data: null,
						});
					}

					if (!data[ruleField[0]][ruleField[1]][ruleField[2]]) {
						return response.status(400).json({
							message: `field ${ruleField[2]} is missing from ${ruleField[1]}.`,
							status: "error",
							data: null,
						});
					}

					return evaluate(
						response,
						data[ruleField[0]][ruleField[1]],
						ruleField[2],
						rule,
						eval(
							`${
								typeof data === "string"
									? data[ruleField[0]][ruleField[1]].split("")[ruleField[0]] ==
									  rule.condition_value
									: data[ruleField[0]][ruleField[1]][ruleField[2]] ==
									  rule.condition_value
							}`
						),
						ruleField[1]
					);
				}

			case "neq":
				if (ruleField[0] && !ruleField[1] && ruleField.length <= 1) {
					return evaluate(
						response,
						data,
						ruleField[0],
						rule,
						eval(
							`${
								typeof data === "string"
									? data.split("")[ruleField[0]] != rule.condition_value
									: data[ruleField[0]] != rule.condition_value
							}`
						)
					);
				}

				if (ruleField[0] && ruleField[1] && !ruleField[2] && ruleField.length <= 2) {
					if (!data[ruleField[0]]) {
						return response.status(400).json({
							message: `field ${ruleField[0]} is missing from data.`,
							status: "error",
							data: null,
						});
					}
					return evaluate(
						response,
						data[ruleField[0]],
						ruleField[1],
						rule,
						eval(
							`${
								typeof data === "string"
									? data[ruleField[0]].split("")[ruleField[0]] !=
									  rule.condition_value
									: data[ruleField[0]][ruleField[1]] != rule.condition_value
							}`
						),
						ruleField[0]
					);
				}

				if (ruleField[0] && ruleField[1] && ruleField[2] && !ruleField[3] && ruleField.length <= 3) {
					if (!data[ruleField[0]]) {
						return response.status(400).json({
							message: `field ${ruleField[0]} is missing from data.`,
							status: "error",
							data: null,
						});
					}

					if (data[ruleField[0]] && !data[ruleField[0]][ruleField[1]]) {
						return response.status(400).json({
							message: `field ${ruleField[1]} is missing from ${ruleField[0]}.`,
							status: "error",
							data: null,
						});
					}

					if (!data[ruleField[0]][ruleField[1]][ruleField[2]]) {
						return response.status(400).json({
							message: `field ${ruleField[2]} is missing from ${ruleField[1]}.`,
							status: "error",
							data: null,
						});
					}

					return evaluate(
						response,
						data[ruleField[0]][ruleField[1]],
						ruleField[2],
						rule,
						eval(
							`${
								typeof data === "string"
									? data[ruleField[0]][ruleField[1]].split("")[ruleField[0]] !=
									  rule.condition_value
									: data[ruleField[0]][ruleField[1]][ruleField[2]] !=
									  rule.condition_value
							}`
						),
						ruleField[1]
					);
				}

			case "gt":
				if (ruleField[0] && !ruleField[1] && ruleField.length <= 1) {
					return evaluate(
						response,
						data,
						ruleField[0],
						rule,
						eval(
							`${
								typeof data === "string"
									? data.split("")[ruleField[0]] > rule.condition_value
									: data[ruleField[0]] > rule.condition_value
							}`
						)
					);
				}

				if (ruleField[0] && ruleField[1] && !ruleField[2] && ruleField.length <= 2) {
					if (!data[ruleField[0]]) {
						return response.status(400).json({
							message: `field ${ruleField[0]} is missing from data.`,
							status: "error",
							data: null,
						});
					}
					return evaluate(
						response,
						data[ruleField[0]],
						ruleField[1],
						rule,
						eval(
							`${
								typeof data === "string"
									? data[ruleField[0]].split("")[ruleField[0]] >
									  rule.condition_value
									: data[ruleField[0]][ruleField[1]] > rule.condition_value
							}`
						),
						ruleField[0]
					);
				}

				if (ruleField[0] && ruleField[1] && ruleField[2] && !ruleField[3] && ruleField.length <= 3) {
					if (!data[ruleField[0]]) {
						return response.status(400).json({
							message: `field ${ruleField[0]} is missing from data.`,
							status: "error",
							data: null,
						});
					}

					if (data[ruleField[0]] && !data[ruleField[0]][ruleField[1]]) {
						return response.status(400).json({
							message: `field ${ruleField[1]} is missing from ${ruleField[0]}.`,
							status: "error",
							data: null,
						});
					}

					if (!data[ruleField[0]][ruleField[1]][ruleField[2]]) {
						return response.status(400).json({
							message: `field ${ruleField[2]} is missing from ${ruleField[1]}.`,
							status: "error",
							data: null,
						});
					}

					return evaluate(
						response,
						data[ruleField[0]][ruleField[1]],
						ruleField[2],
						rule,
						eval(
							`${
								typeof data === "string"
									? data[ruleField[0]][ruleField[1]].split("")[ruleField[0]] >
									  rule.condition_value
									: data[ruleField[0]][ruleField[1]][ruleField[2]] >
									  rule.condition_value
							}`
						),
						ruleField[1]
					);
				}

			case "gte":
				if (ruleField[0] && !ruleField[1] && ruleField.length <= 1) {
					return evaluate(
						response,
						data,
						ruleField[0],
						rule,
						eval(
							`${
								typeof data === "string"
									? data.split("")[ruleField[0]] >= rule.condition_value
									: data[ruleField[0]] >= rule.condition_value
							}`
						)
					);
				}

				if (ruleField[0] && ruleField[1] && !ruleField[2] && ruleField.length <= 2) {
					if (!data[ruleField[0]]) {
						return response.status(400).json({
							message: `field ${ruleField[0]} is missing from data.`,
							status: "error",
							data: null,
						});
					}
					return evaluate(
						response,
						data[ruleField[0]],
						ruleField[1],
						rule,
						eval(
							`${
								typeof data === "string"
									? data[ruleField[0]].split("")[ruleField[0]] >=
									  rule.condition_value
									: data[ruleField[0]][ruleField[1]] >= rule.condition_value
							}`
						),
						ruleField[0]
					);
				}

				if (ruleField[0] && ruleField[1] && ruleField[2] && !ruleField[3] && ruleField.length <= 3) {
					if (!data[ruleField[0]]) {
						return response.status(400).json({
							message: `field ${ruleField[0]} is missing from data.`,
							status: "error",
							data: null,
						});
					}

					if (data[ruleField[0]] && !data[ruleField[0]][ruleField[1]]) {
						return response.status(400).json({
							message: `field ${ruleField[1]} is missing from ${ruleField[0]}.`,
							status: "error",
							data: null,
						});
					}

					if (!data[ruleField[0]][ruleField[1]][ruleField[2]]) {
						return response.status(400).json({
							message: `field ${ruleField[2]} is missing from ${ruleField[1]}.`,
							status: "error",
							data: null,
						});
					}

					return evaluate(
						response,
						data[ruleField[0]][ruleField[1]],
						ruleField[2],
						rule,
						eval(
							`${
								typeof data === "string"
									? data[ruleField[0]][ruleField[1]].split("")[ruleField[0]] >=
									  rule.condition_value
									: data[ruleField[0]][ruleField[1]][ruleField[2]] >=
									  rule.condition_value
							}`
						),
						ruleField[1]
					);
        }
        
			case "contains":
				if (ruleField[0] && !ruleField[1] && ruleField.length <= 1) {
					return evaluate(
						response,
						data,
						ruleField[0],
						rule,
						typeof data === "string"
							? data
									.split("")
									.map((x: string | number) =>
										isNaN(x as number) ? x : parseInt(x as string)
									)
									.includes(rule.condition_value)
							: Array.isArray(data)
							? data
									.map((x: string | number) =>
										isNaN(x as number) ? x : parseInt(x as string)
									)
									.includes(rule.condition_value)
							: false,
						"data",
						rule.condition
					);
				}

				if (ruleField[0] && ruleField[1] && !ruleField[2] && ruleField.length <= 2) {
					if (!data[ruleField[0]]) {
						return response.status(400).json({
							message: `field ${ruleField[0]} is missing from data.`,
							status: "error",
							data: null,
						});
					}
					return evaluate(
						response,
						data[ruleField[0]],
						ruleField[1],
						rule,
						typeof data[ruleField[0]] === "string"
							? data[ruleField[0]]
									.split("")
									.map((x: string | number) =>
										isNaN(x as number) ? x : parseInt(x as string)
									)
									.includes(rule.condition_value)
							: Array.isArray(data[ruleField[0]])
							? data[ruleField[0]]
									.map((x: string | number) =>
										isNaN(x as number) ? x : parseInt(x as string)
									)
									.includes(rule.condition_value)
							: false,
						ruleField[0],
						rule.condition
					);
				}

				if (ruleField[0] && ruleField[1] && ruleField[2] && !ruleField[3] && ruleField.length <= 3) {
					if (!data[ruleField[0]]) {
						return response.status(400).json({
							message: `field ${ruleField[0]} is missing from data.`,
							status: "error",
							data: null,
						});
					}

					if (data[ruleField[0]] && !data[ruleField[0]][ruleField[1]]) {
						return response.status(400).json({
							message: `field ${ruleField[1]} is missing from ${ruleField[0]}.`,
							status: "error",
							data: null,
						});
					}

					if (!data[ruleField[0]][ruleField[1]][ruleField[2]]) {
						return response.status(400).json({
							message: `field ${ruleField[2]} is missing from ${ruleField[1]}.`,
							status: "error",
							data: null,
						});
					}
					return evaluate(
						response,
						data[ruleField[0]][ruleField[1]],
						ruleField[2],
						rule,
						typeof data[ruleField[0]][ruleField[1]] === "string"
							? data[ruleField[0]][ruleField[1]]
									.split("")
									.map((x: string | number) =>
										isNaN(x as number) ? x : parseInt(x as string)
									)
									.includes(rule.condition_value)
							: Array.isArray(data[ruleField[0]][ruleField[1]])
							? data[ruleField[0]][ruleField[1]]
									.map((x: string | number) =>
										isNaN(x as number) ? x : parseInt(x as string)
									)
									.includes(rule.condition_value)
							: false,
						ruleField[1],
						rule.condition
					);
				}
		}

		return response.status(400).json({
      message: 'field should be either a single word or a maximum of three words separated by dots.',
      status: "error",
      data: null,
    });
	}
);

export default app;
