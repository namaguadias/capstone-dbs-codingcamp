from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import io

app = Flask(__name__)

model = load_model("finalModel.keras")

CONFIDENCE_THRESHOLD = 0.60 

class_info = {
    0: {
        "label": "Nail_psoriasis",
        "arti": "bentuk psoriasis yang memengaruhi kuku, ditandai dengan cekungan kecil pada permukaan kuku (pitting), kuku yang terlepas dari dasarnya (onikolisis), perubahan warna menjadi kekuningan atau kecoklatan, serta penebalan atau kerapuhan kuku. Kondisi ini sering terjadi bersamaan dengan psoriasis kulit atau arthritis psoriatik.",
        "saran": "Pengobatan nail psoriasis bergantung pada tingkat keparahan dan dampaknya terhadap kualitas hidup. Terapi topikal seperti kortikosteroid poten, calcipotriol, atau tacrolimus dapat digunakan meskipun penyerapannya ke kuku terbatas. Pada kasus yang lebih berat, terapi sistemik seperti biologis (misalnya anti-IL-17) atau JAK inhibitor terbukti efektif dalam studi klinis. Perawatan tambahan meliputi menjaga kuku tetap pendek dan bersih, menghindari trauma, menggunakan pelembap dengan vitamin E, serta tidak menggunakan kuku palsu atau gel. Segera hubungi dokter atau unit gawat darurat untuk penanganan lebih lanjut."
    },
    1: {
        "label": "SJS-TEN",
        "arti": "reaksi kulit berat akibat hipersensitivitas terhadap obat-obatan, ditandai dengan lesi menyakitkan pada kulit dan mukosa, demam, serta pengelupasan kulit luas (lebih dari 30% permukaan tubuh pada TEN). Kondisi ini sering dipicu oleh obat seperti antibiotik, antiepileptik, dan NSAID, dan memerlukan penanganan medis segera karena dapat mengancam jiwa.",
        "saran": "Pengobatan Stevens-Johnson Syndrome (SJS) dan Toxic Epidermal Necrolysis (TEN) meliputi penghentian segera obat penyebab, perawatan di unit intensif atau luka bakar dengan pengelolaan cairan, elektrolit, nutrisi, serta perawatan luka dan pencegahan infeksi. Terapi imunomodulator seperti kortikosteroid sistemik, siklosporin, dan anti-TNF (etanercept) dapat dipertimbangkan, meskipun efektivitas kortikosteroid dan IVIG masih kontroversial. Perawatan tambahan meliputi perawatan intensif pada mata dan mulut, penggunaan dressing steril, lingkungan aseptik, serta pemantauan ketat terhadap komplikasi sistemik. Segera hubungi dokter atau unit gawat darurat untuk penanganan lebih lanjut."
    },
    2: {
        "label": "Vitiligo",
        "arti": "penyakit kulit yang ditandai dengan hilangnya pigmentasi di beberapa bagian tubuh, sehingga muncul bercak putih pada kulit. Bercak-bercak ini terjadi karena kerusakan atau hilangnya melanosit, sel yang berfungsi untuk memproduksi melanin, pigmen yang memberi warna pada kulit.",
        "saran": "Penanganan Pengelolaan vitiligo dapat dilakukan melalui fototerapi Narrowband UVB (NB-UVB) yang efektif merangsang repigmentasi kulit, penggunaan obat topikal seperti kortikosteroid atau tacrolimus untuk mengurangi peradangan dan mendorong pertumbuhan melanosit, serta eksplorasi terapi stem cell sebagai pendekatan inovatif. Meskipun belum ada pengobatan yang dapat menyembuhkan vitiligo secara permanen, terapi yang ada dapat membantu mengendalikan gejala dan meningkatkan kualitas hidup penderita. Segera hubungi dokter atau unit gawat darurat untuk penanganan lebih lanjut."
    },
    3: {
        "label": "Acne",
        "arti": "kondisi kulit kronis yang terjadi akibat peradangan pada unit pilosebasea (folikel rambut dan kelenjar sebasea), yang ditandai dengan munculnya komedo, papul, pustul, nodul, atau kista.Penyebab utamanya adalah penyumbatan pori-pori oleh sebum (minyak alami kulit) dan sel kulit mati, serta kolonisasi bakteri Cutibacterium acnes, yang memicu reaksi peradangan di kulit.",
        "saran": "Gunakan produk non-komedogenik: Pilih produk perawatan kulit yang berlabel non-comedogenic untuk menghindari penyumbatan pori-pori. Produk seperti gel atau cairan ringan lebih disarankan dibandingkan krim berat. Segera hubungi dokter atau unit gawat darurat untuk penanganan lebih lanjut."
    },
    4: {
        "label": "Hyperpigmentation",
        "arti": "kondisi kulit di mana terjadi peningkatan jumlah atau distribusi melanin, pigmen yang memberi warna pada kulit. Kondisi ini dapat menyebabkan perubahan warna kulit menjadi lebih gelap pada area tertentu. Hiperpigmentasi bukanlah penyakit dalam dirinya sendiri, melainkan suatu gejala atau tanda dari kondisi medis lainnya. Penyebab utamanya adalah peningkatan produksi melanin oleh melanosit, sel yang memproduksi pigmen di kulit. Kondisi ini sering kali dikaitkan dengan faktor-faktor eksternal seperti paparan sinar ultraviolet (UV), peradangan, dan cedera kulit.",
        "saran": "Penanganan hiperpigmentasi dapat dilakukan dengan penggunaan tabir surya untuk mencegah paparan sinar UV, obat topikal seperti hidrokuinon atau niacinamide untuk menghambat produksi melanin, serta prosedur seperti peeling kimiawi dan terapi laser untuk mengurangi pigmentasi. Perawatan ini biasanya memerlukan waktu dan konsistensi untuk hasil yang optimal. Segera hubungi dokter atau unit gawat darurat untuk penanganan lebih lanjut."
    }
}

def preprocess_image(img, target_size=(224, 224)):
    if img.mode != "RGB":
        img = img.convert("RGB")
    img = img.resize(target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    return img_array

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    try:
        img = Image.open(file.stream)
        processed_img = preprocess_image(img)
        prediction = model.predict(processed_img)
        
        predicted_class_index = int(np.argmax(prediction[0]))
        confidence = float(np.max(prediction[0]))

        if confidence < CONFIDENCE_THRESHOLD:
            return jsonify({
                "label": "Bukan Gambar Kulit",
                "arti": "Sistem tidak dapat mengidentifikasi ini sebagai gambar kulit atau tingkat CONFIDENCE terlalu rendah.",
                "saran": "Pastikan gambar yang Anda unggah adalah gambar kulit yang jelas dan relevan.",
                "confidence": round(confidence, 3) 
            }), 200 
        
        result = {
            "label": class_info[predicted_class_index]["label"],
            "arti": class_info[predicted_class_index]["arti"],
            "saran": class_info[predicted_class_index]["saran"],
            "confidence": round(confidence, 3)
        }
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/", methods=["GET"])
def index():
    return "Skin Disease Detection API with details is running."

if __name__ == "__main__":
    app.run(debug=True)