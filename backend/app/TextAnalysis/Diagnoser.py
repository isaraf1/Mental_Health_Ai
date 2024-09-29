import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
from sklearn.preprocessing import MultiLabelBinarizer
import pandas as pd

# Step 2: Define a function for making predictions

# Example usage
# new_question = "Sexual orientation issues"
# predicted_topics = predict_question(new_question)
# print(f"Predicted topics: {predicted_topics}")

# new_question = ""
# predicted_topics = predict_question(new_question)
# print(predicted_topics)

def Diagnose(query):
    data = pd.read_csv('app/TextAnalysis/counselchat-data.csv')

    # Drop rows where either 'questionText' or 'topics' is missing
    data = data.dropna(subset=['questionText', 'topics'])

    # Split topics into a list
    data['topics'] = data['topics'].apply(lambda x: x.split(','))

    # Binarize the topics (multi-label encoding)
    mlb = MultiLabelBinarizer()
    topics_binarized = mlb.fit_transform(data['topics'])
    # Load the model and tokenizer from the local directory
    model_path = 'app/TextAnalysis/saved_model'  # Update this with your model's directory
    # print(mlb.labels)
    # Load the model from safetensors
    model = DistilBertForSequenceClassification.from_pretrained(model_path, local_files_only=False)

    # Load the tokenizer
    tokenizer = DistilBertTokenizer.from_pretrained(model_path)

    # Set the model to evaluation mode
    model.eval()

    threshold=0.10

    inputs = tokenizer(query, return_tensors='pt', truncation=True, padding=True, max_length=64)
    outputs = model(**inputs)
    logits = outputs.logits
    predictions = torch.sigmoid(logits).detach().cpu().numpy()

    # Apply the threshold for multi-label classification
    predicted_labels = (predictions > threshold).astype(int)
    
    # Return predicted labels (can be mapped to actual labels later)
    return mlb.inverse_transform(predicted_labels)