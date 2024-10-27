from flask import Flask, request, jsonify
import openai

app = Flask(__name__)


openai.api_key = "key removed for github"

@app.route('/define_term', methods=['POST'])
def define_term():
    data = request.get_json()
    term = data.get("term")
    
    if not term:
        return jsonify({"error": "No term provided"}), 400
    
    try:
        
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"Explain the financial term '{term}' in simple terms.",
            max_tokens=50
        )
        definition = response.choices[0].text.strip()
        return jsonify({"definition": definition})
    except Exception as e:
        print("Error with OpenAI API:", e)
        return jsonify({"error": "Failed to fetch definition"}), 500

if __name__ == '__main__':
    app.run(debug=True)
