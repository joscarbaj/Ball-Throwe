from flask import Flask,request,redirect,render_template
import os


app = Flask(__name__)

@app.route("/")
def Index():
    return render_template("index.html")
if __name__ == "__main__":
    app.run(debug = True, port = 300,host= "0.0.0.0")