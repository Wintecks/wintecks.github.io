from flask import Flask, jsonify, request
from flask_cors import CORS

import get

app = Flask(__name__)
CORS(app)

@app.route('/api/get/info-video', methods=['POST'])
def process_video():

    return jsonify(get.video_info(request.get_json()['url']))

if __name__ == '__main__':
    app.run(debug=True, port=5000)