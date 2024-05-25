# selectPhotos.py
import sys
import os
import random

def get_photo_ids(folder_path):
    photos = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
    chosen_photos = random.sample(photos, 3)
    ids = [int(photo.split('.')[0]) for photo in chosen_photos]
    return ids

if __name__ == "__main__":
    folder_path = sys.argv[1]
    ids = get_photo_ids(folder_path)
    print(" ".join(map(str, ids)))