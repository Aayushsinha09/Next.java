from flask import Flask, request, jsonify

app = Flask(__name__)


full_name = "NiravraBaksi"
date_of_birth = "27 02 2002"
user_id = f"{full_name.lower().replace(' ', '_')}_{date_of_birth}"


email = "niravra.baksi2020@vitstudent.ac.in"
roll_number = "20BCI0153"

@app.route('/', methods=['POST'])
def bfhl_post():
    try:
        data = request.json.get('data', [])  
        numbers = [str(item) for item in data if isinstance(item, (int, float))]
        alphabets = [item for item in data if isinstance(item, str) and len(item) == 1 and item.isalpha()]
        highest_alphabet = [max(alphabets, key=lambda x: x.lower())] if alphabets else []

        response = {
            "is_success": True,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": highest_alphabet
        }

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"is_success": False, "error_message": str(e)}), 400

@app.route('/', methods=['GET'])
def bfhl_get():
    return jsonify({"operation_code": 1}), 200

if __name__ == '__main__':
    app.run(debug=False,host='0.0.0.0')
