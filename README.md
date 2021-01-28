# Rule Validation API

## Overview

The **Rule validation API** app is a service that returns responses based on validation rules set in the request.

## Technology Stack

- Nodejs
- Typescript

## URL to hosted application

- [LINK](https://floating-ravine-11601.herokuapp.com/)

## Libraries used

You can get the details of the libraries used in the package.json file in the root directory of this project

### Setting Up

Clone the repo and cd into it: `git clone https://github.com/dbytecoderc/rule-validation-api.git`

Install dependencies using the command: `yarn install`

Run the application with the command: `yarn dev`

### Testing

- Vist the API using the [link](https://floating-ravine-11601.herokuapp.com/validate-rule).
- Sample `POST` request ```{
  "rule": {
    "field": "missions"
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": 45
  }
}```

- Expected response ```{
    "message": "field missions successfully validated.",
    "status": "success",
    "data": {
      "validation": {
        "error": false,
        "field": "missions",
        "field_value": 45,
        "condition": "gte",
        "condition_value": 30
      }
    }
  }```

  - eq: Means the field value should be equal to the condition value
  - neq: Means the field value should not be equal to the condition value
  - gt: Means the field value should be greater than the condition value
  - gte: Means the field value should be greater than or equal to the condition value
  - contains: Means the field value should contain the condition value
