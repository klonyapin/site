#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="euplotes-site-2hpiyu"
LOCATION="asia-northeast1"
BUCKET_NAME="euplotes-site-2hpiyu-assets"

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 path/to/icon.jpg" >&2
  exit 1
fi

ICON_PATH="$1"

if [[ ! -f "$ICON_PATH" ]]; then
  echo "File not found: $ICON_PATH" >&2
  exit 1
fi

gcloud config set project "$PROJECT_ID"
OBJECT_NAME="profile-icon.${ICON_PATH##*.}"

if ! gcloud storage buckets describe "gs://${BUCKET_NAME}" --project "$PROJECT_ID" >/dev/null 2>&1; then
  gcloud storage buckets create "gs://${BUCKET_NAME}" \
    --project "$PROJECT_ID" \
    --location "$LOCATION" \
    --uniform-bucket-level-access \
    --no-public-access-prevention
fi

gcloud storage buckets add-iam-policy-binding "gs://${BUCKET_NAME}" \
  --project "$PROJECT_ID" \
  --member="allUsers" \
  --role="roles/storage.objectViewer"

gcloud storage cp "$ICON_PATH" "gs://${BUCKET_NAME}/${OBJECT_NAME}" \
  --project "$PROJECT_ID" \
  --cache-control="public,max-age=3600"

ICON_URL="https://storage.googleapis.com/${BUCKET_NAME}/${OBJECT_NAME}"

echo
echo "Upload complete. Set this in profile.toml:"
echo "icon_url = \"${ICON_URL}\""
