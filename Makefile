.PHONY: deploy build dev logs

# Google Cloud Run configuration
SERVICE_NAME = synthecia
REGION = us-central1

# Deploy to Google Cloud Run directly from source (uses Cloud Build)
deploy:
	@echo "🚀 Deploying $(SERVICE_NAME) to Cloud Run in $(REGION)..."
	gcloud run deploy $(SERVICE_NAME) \
		--source . \
		--region $(REGION) \
		--allow-unauthenticated \
		--min-instances 0 \
		--quiet
	@echo "✅ Deployment complete!"

# Build the Docker image locally for testing
build:
	@echo "🐳 Building Docker image locally..."
	docker build -t $(SERVICE_NAME)-local .

# Run the local Next.js development server
dev:
	@echo "💻 Starting local development server..."
	npm run dev

# View live logs for the Cloud Run service
logs:
	@echo "📋 Tailing logs for $(SERVICE_NAME)..."
	gcloud run services logs tail $(SERVICE_NAME) --region $(REGION)
