# from fastapi import FastAPI, File, UploadFile, HTTPException
# from fastapi.responses import JSONResponse
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles
# import numpy as np
# from PIL import Image
# from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
# from tensorflow.keras.layers import GlobalMaxPooling2D
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.preprocessing import image
# from numpy.linalg import norm
# import pickle

# from io import BytesIO
import random
import os
import sys

# app = FastAPI()

# # Enable CORS for React frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Mount the static files directory
# app.mount("/static", StaticFiles(directory="static"), name="static")

# # Load pre-trained ResNet50 model
# model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
# model.trainable = False
# model = Sequential([
#     model,
#     GlobalMaxPooling2D()
# ])

# # Load feature vectors and filenames
# try:
#     with open('embeddings.pkl', 'rb') as f:
#         feature_list = np.array(pickle.load(f))
#     with open('filenames.pkl', 'rb') as f:
#         filenames = pickle.load(f)
# except FileNotFoundError:
#     feature_list = np.array([])
#     filenames = []

# @app.post("/upload/")
# async def upload_file(file: UploadFile = File(...)):
#     try:
#         contents = await file.read()
#         img = Image.open(BytesIO(contents))
#         img = img.resize((224, 224))
#         img_array = image.img_to_array(img)
#         expanded_img_array = np.expand_dims(img_array, axis=0)
#         preprocessed_img = preprocess_input(expanded_img_array)
#         result = model.predict(preprocessed_img).flatten()
#         normalized_result = result / norm(result)
#         return JSONResponse(content={"features": normalized_result.tolist()})
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @app.get("/recommend/")
# def recommend():
#     try:
#         num_recommendations = 5
#         num_items = len(feature_list)
#         if num_items == 0:
#             raise HTTPException(status_code=500, detail="Feature list is empty.")
#         random_indices = random.sample(range(num_items), num_recommendations)
#         # Construct the full URL for each recommended image
#         recommended_images = [f"http://localhost:8000/static/{os.path.basename(filenames[i])}" for i in random_indices]
#         return JSONResponse(content={"recommendations": recommended_images})
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

#added function
def get_photo_ids(folder_path):
    photos = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
    chosen_photos = random.sample(photos, 3)
    ids = [int(photo.split('.')[0]) for photo in chosen_photos]
    return ids

if __name__ == "__main__":
    folder_path = sys.argv[1]
    ids = get_photo_ids(folder_path)
    print(" ".join(map(str, ids)))


# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
