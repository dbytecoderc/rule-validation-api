import { Request, Response, NextFunction } from "express";

export const validator = (request: Request, response: Response, next: NextFunction) => {
  const { rule, data } = request.body;

  if(!rule){
    return response.status(400).json({
      message: "rule is required.",
      status: "error",
      data: null
    })
  }

  if(rule && Object.prototype.toString.call(rule) !== '[object Object]'){
    return response.status(400).json({
      message: "rule should be an object.",
      status: "error",
      data: null
    })
  }

  if(!rule.field){
    return response.status(400).json({
      message: "field of name 'field' is missing from rule.",
      status: "error",
      data: null
    })
  }

  if(typeof rule.field !== "string"){
    return response.status(400).json({
      message: "field should be a string.",
      status: "error",
      data: null
    })
  }

  if(!rule.condition){
    return response.status(400).json({
      message: "field condition is missing from rule.",
      status: "error",
      data: null
    })
  }

  if(rule.condition){
    const validCondtions = ['eq', 'neq', 'gt', 'gte', 'contains'];
    if(validCondtions.indexOf(rule.condition) === -1){
      return response.status(400).json({
        message: "conditon should be one of eq, neq, gt, gte or contains.",
        status: "error",
        data: null
      })
    }
  }

  if(!rule.condition_value){
    return response.status(400).json({
      message: "field condition_value is missing from rule.",
      status: "error",
      data: null
    })
  }

  if(!data){
    return response.status(400).json({
      message: "data is required.",
      status: "error",
      data: null
    })
  }

  if(!Array.isArray(data) && Object.prototype.toString.call(data) !== '[object Object]' && typeof data !== "string"){
    return response.status(400).json({
      message: "data should be an array, object or string.",
      status: "error",
      data: null
    })
  }
  
  next()
}
