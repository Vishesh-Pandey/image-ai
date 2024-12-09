# Use Node.js base image
FROM public.ecr.aws/lambda/nodejs:18

# Copy application files
COPY . ${LAMBDA_TASK_ROOT}

# Install dependencies
RUN npm install

# Specify Lambda handler
CMD ["lambda.handler"]