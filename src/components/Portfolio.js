import React, { useState } from 'react';
import WebSitesiImg from "../assets/WebSitesi.png";
import OtoServis from "../assets/OtoServis.png";

function Portfolio() {
  const [openImg, setOpenImg] = useState(null); 
  const [showCodeModal, setShowCodeModal] = useState(false); 
  
  const sourceCode = `
import sys
import datetime
import os
import sqlite3
from PyQt5.QtWidgets import QInputDialog, QMessageBox
from PyQt5.QtWidgets import (
    QApplication, QMainWindow, QVBoxLayout, QLineEdit, QPushButton, QLabel,
    QMessageBox, QWidget, QTableWidgetItem, QTableWidget, QComboBox, QHBoxLayout
)
import subprocess
import platform
from PyQt5.QtCore import QTimer, Qt
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont("TurkceFont", "DejaVuSans.ttf"))


# ---------------------------------- Yardımcı Fonksiyonlar ----------------------------------
def center_window(window):
    screen = QApplication.primaryScreen().geometry()
    window_geometry = window.frameGeometry()
    center_point = screen.center()
    window_geometry.moveCenter(center_point)
    window.move(window_geometry.topLeft())

# ---------------------------------- Kayıt Ekranı ----------------------------------
class KayıtEkranı(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Kayıt Ol")
        self.setGeometry(200, 200, 300, 200)
        center_window(self)

        layout = QVBoxLayout()

        self.kullanici_adi_input = QLineEdit()
        self.kullanici_adi_input.setPlaceholderText("Kullanıcı Adı")

        self.sifre_input = QLineEdit()
        self.sifre_input.setPlaceholderText("Şifre")
        self.sifre_input.setEchoMode(QLineEdit.Password)

        self.kayit_button = QPushButton("Kayıt Ol")
        self.kayit_button.clicked.connect(self.kayit_ol)

        layout.addWidget(self.kullanici_adi_input)
        layout.addWidget(self.sifre_input)
        layout.addWidget(self.kayit_button)

        container = QWidget()
        container.setLayout(layout)
        self.setCentralWidget(container)

    def kayit_ol(self):
        kullanici_adi = self.kullanici_adi_input.text()
        sifre = self.sifre_input.text()

        if kullanici_adi and sifre:
            try:
                conn = sqlite3.connect('kullanici_veritabani.db')
                cursor = conn.cursor()
                cursor.execute("INSERT INTO kullanicilar (kullanici_adi, sifre) VALUES (?, ?)", (kullanici_adi, sifre))
                conn.commit()
                conn.close()

                QMessageBox.information(self, "Başarılı", "Kayıt başarılı!")
                self.kullanici_adi_input.clear()
                self.sifre_input.clear()
                self.close()
                self.main_window = LoginEkranı()
                self.main_window.show()
            except sqlite3.IntegrityError:
                QMessageBox.warning(self, "Hata", "Bu kullanıcı adı zaten alınmış!")
        else:
            QMessageBox.warning(self, "Hata", "Kullanıcı adı ve şifre boş olamaz!")

# ---------------------------------- Giriş Ekranı ----------------------------------
class LoginEkranı(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Giriş Yap")
        self.setGeometry(200, 200, 300, 200)
        center_window(self)

        layout = QVBoxLayout()

        self.kullanici_adi_input = QLineEdit()
        self.kullanici_adi_input.setPlaceholderText("Kullanıcı Adı")

        self.sifre_input = QLineEdit()
        self.sifre_input.setPlaceholderText("Şifre")
        self.sifre_input.setEchoMode(QLineEdit.Password)

        self.giris_button = QPushButton("Giriş Yap")
        self.giris_button.clicked.connect(self.giris_yap)

        self.kayit_button = QPushButton("Kayıt Ol")
        self.kayit_button.clicked.connect(self.kayit_ol)

        self.giris_mesaji = QLabel("Giriş yapılıyor...")
        self.giris_mesaji.setStyleSheet("color: green; font-weight: bold;")
        self.giris_mesaji.setAlignment(Qt.AlignCenter)
        self.giris_mesaji.hide()

        layout.addWidget(self.kullanici_adi_input)
        layout.addWidget(self.sifre_input)
        layout.addWidget(self.giris_button)
        layout.addWidget(self.kayit_button)
        layout.addWidget(self.giris_mesaji)

        container = QWidget()
        container.setLayout(layout)
        self.setCentralWidget(container)

    def giris_yap(self):
        kullanici_adi = self.kullanici_adi_input.text()
        sifre = self.sifre_input.text()

        if kullanici_adi and sifre:
            conn = sqlite3.connect('kullanici_veritabani.db')
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM kullanicilar WHERE kullanici_adi = ? AND sifre = ?", (kullanici_adi, sifre))
            kullanici = cursor.fetchone()
            conn.close()

            if kullanici:
                self.giris_mesaji.show()
                QTimer.singleShot(500, self.ana_ekrana_gecis)
            else:
                QMessageBox.warning(self, "Hata", "Kullanıcı adı veya şifre yanlış!")
        else:
            QMessageBox.warning(self, "Hata", "Kullanıcı adı ve şifre boş olamaz!")

    def ana_ekrana_gecis(self):
        self.close()
        kullanici_adi = self.kullanici_adi_input.text()
        self.ana_ekran = AnaEkran(kullanici_adi)
        self.ana_ekran.show()

    def kayit_ol(self):
        self.close()
        self.kayit_ekrani = KayıtEkranı()
        self.kayit_ekrani.show()

# ---------------------------------- Ana Ekran ----------------------------------
class AnaEkran(QMainWindow):
    def __init__(self,kullanici_adi):
        super().__init__()
        self.kullanici_adi = kullanici_adi
        self.setWindowTitle("Ana Ekran")
        self.setGeometry(200, 200, 500, 350)
        center_window(self)

        main_layout = QVBoxLayout()

        self.label = QLabel("Seçili Araç Bilgileri")
        self.label.setStyleSheet("font-size: 20px; font-weight: bold;")
        self.label.setAlignment(Qt.AlignCenter)
        self.label.setStyleSheet("font-size: 16px; font-weight: bold;")

        self.kullanici_label = QLabel("Kullanıcı:")
        self.kullanici_adi_input = QLineEdit()
        self.kullanici_adi_input.setReadOnly(True)
        self.kullanici_adi_input.setStyleSheet("background-color: #f0f0f0;")
        self.kullanici_adi_input.setText(self.kullanici_adi)

        #Bakım Sayısı
        self.bakım_sayisi_label = QLabel("Bakım Sayısı:")
        self.bakım_sayisi_label.setStyleSheet("font-weight: bold; font-size: 14px;")

        self.bakım_sayisi_combo = QComboBox()
        self.bakım_sayisi_combo.setFixedWidth(100)
        

        # Kullanıcı
        self.kullanici_label = QLabel("Kullanıcı:")
        self.kullanici_adi_input = QLineEdit()
        self.kullanici_adi_input.setReadOnly(True)
        self.kullanici_adi_input.setFixedWidth(120)
        self.kullanici_adi_input.setStyleSheet("background-color: #f0f0f0;")
        self.kullanici_adi_input.setText(self.kullanici_adi)

        # Plaka
        self.plaka_label = QLabel("Plaka:")
        self.plaka_label.setStyleSheet("font-weight: bold; font-size: 14px;")
        self.plaka_input = QLineEdit()
        self.plaka_input.setPlaceholderText("Araç plakası")
        # self.plaka_input.setReadOnly(True)

        # Marka
        self.marka_label = QLabel("Marka:")
        self.marka_label.setStyleSheet("font-weight: bold; font-size: 14px;")
        self.marka_input = QLineEdit()
        self.marka_input.setPlaceholderText("Araç markası")
        # self.marka_input.setReadOnly(True)

        # Model
        self.model_label = QLabel("Model:")
        self.model_label.setStyleSheet("font-weight: bold; font-size: 14px;")
        self.model_input = QLineEdit()
        self.model_input.setPlaceholderText("Araç modeli")
        # self.model_input.setReadOnly(True)

        # Motor
        self.motor_label = QLabel("Motor:")
        self.motor_label.setStyleSheet("font-weight: bold; font-size: 14px;")
        self.motor_input = QLineEdit()
        self.motor_input.setPlaceholderText("Araç motor bilgisi")
        # self.motor_input.setReadOnly(True)

        

        self.kullanıcı_degistir = QPushButton("Kullanıcı Değiştir")
        self.kullanıcı_degistir.setFixedWidth(120)
        self.kullanıcı_degistir.clicked.connect(self.kullanici_degistir_fnk)

        self.buton1 = QPushButton("Yeni Giriş")
        self.buton1.clicked.connect(self.yeni_giris_ac)

        self.plaka_sorgula = QPushButton("Plaka Sorgula")
        self.plaka_sorgula.clicked.connect(self.plaka_sorgula_fnk)

        self.rapor_butonu = QPushButton("Rapor Oluştur")
        self.rapor_butonu.clicked.connect(self.rapor_olustur)
         
        self.bakım_ekle = QPushButton("Bakım Ekle")
        self.bakım_ekle.clicked.connect(self.bakim_ekle_ac)

        self.arac_sec = QPushButton("Arac Sec")
        self.arac_sec.clicked.connect(self.arac_sec_ac)

        self.buton7 = QPushButton("Bakım Detayı")
        self.buton7.clicked.connect(self.bakim_detay_ac)

        
        # Layout ayarları
        top_buttons = QHBoxLayout()
        top_buttons.addWidget(self.kullanici_label)
        top_buttons.addWidget(self.kullanici_adi_input)
        top_buttons.addStretch()  # Araya boşluk koymak için
        top_buttons.addWidget(self.kullanıcı_degistir)

        bottom_buttons = QHBoxLayout()
        for btn in [self.buton1, self.plaka_sorgula, self.rapor_butonu, self.bakım_ekle, self.arac_sec]:
            bottom_buttons.addWidget(btn)

        main_layout.addLayout(top_buttons)
        main_layout.addLayout(bottom_buttons)
        
        main_layout.addWidget(self.label)
        main_layout.addWidget(self.bakım_sayisi_label)
        main_layout.addWidget(self.bakım_sayisi_combo)
        main_layout.addWidget(self.plaka_label)
        main_layout.addWidget(self.plaka_input)
        main_layout.addWidget(self.marka_label)
        main_layout.addWidget(self.marka_input)
        main_layout.addWidget(self.model_label)
        main_layout.addWidget(self.model_input)
        main_layout.addWidget(self.motor_label)
        main_layout.addWidget(self.motor_input)
      
        main_layout.addWidget(self.buton7)

        container = QWidget()
        container.setLayout(main_layout)
        self.setCentralWidget(container)

    def kullanici_degistir_fnk(self):
        self.close()
        self.login_ekrani = LoginEkranı()
        self.login_ekrani.show()

    def plaka_sorgula_fnk(self):
        # 1) Kullanıcıdan pop-up ile plaka iste
        plaka, ok = QInputDialog.getText(self, "Plaka Sorgula", "Araç plakasını girin:")
        if not ok or not plaka.strip():
            return  # ya iptal etti ya boş girdi
        
        plaka = plaka.strip().upper()  # dilersen büyük harfe çevir
        
        # 2) Veritabanından sorgula
        try:
            conn = sqlite3.connect("kullanici_veritabani.db")
            cursor = conn.cursor()
            cursor.execute(
                "SELECT marka, model, km, motor FROM araclar WHERE plaka = ?",
                (plaka,)
            )
            sonuc = cursor.fetchone()
            conn.close()
        except Exception as e:
            QMessageBox.critical(self, "Hata", f"Veritabanı hatası:\n{e}")
            return

        # 3) Sonuca göre UI’ı doldur
        if sonuc:
            marka, model, km, motor = sonuc
            self.plaka_input.setText(plaka)
            self.marka_input.setText(marka or "")
            # Eğer km için QLineEdit’in varsa:
            # self.km_input.setText(str(km))
            self.model_input.setText(model or "")
            self.motor_input.setText(motor or "")

            self.bakim_sayisi_guncelle(plaka)

            # Opsiyonel: salt-okunur yapmak istersen
            #self.plaka_input.setReadOnly(True)
            #self.marka_input.setReadOnly(True)
            #self.model_input.setReadOnly(True)
            #self.km_input.setReadOnly(True)
            #self.motor_input.setReadOnly(True)
        else:
            QMessageBox.information(self, "Bilgi",
                                    f"“{plaka}” plakalı araç bulunamadı.")

    def bakim_sayisi_guncelle(self, plaka):
        # Plakayı ana ekrana otomatik olarak yerleştir
        self.plaka_input.setText(plaka)

        try:
            conn = sqlite3.connect("kullanici_veritabani.db")
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(DISTINCT bakim_no) FROM bakimlar WHERE plaka = ?", (plaka,))
            bakim_sayisi = cursor.fetchone()[0]
            conn.close()

            # Bakım sayısı combo box'ını güncelle
            self.bakım_sayisi_combo.clear()
            self.bakım_sayisi_combo.addItems([f"Bakım {i+1}" for i in range(bakim_sayisi)])

        except Exception as e:
            QMessageBox.critical(self, "Hata", f"Bakım sayısı güncellenemedi: {e}")
    
    def bakim_detay_ac(self):
        plaka = self.plaka_input.text().strip()
        if not plaka:
            QMessageBox.warning(self, "Uyarı", "Lütfen önce bir araç seçin.")
            return

        self.bakim_detay_penceresi = BakimDetayPenceresi(self)
        self.bakim_detay_penceresi.show()

    def bakim_ekle_ac(self):
        plaka = self.plaka_input.text().strip()
        if not plaka:
            QMessageBox.warning(self, "Uyarı", "Lütfen önce bir araç seçin.")
            return

        self.bakim_ekle_penceresi = BakimEklePenceresi(self)
        self.bakim_ekle_penceresi.show()

    def yeni_giris_ac(self):
        self.yeni_giris_penceresi = YeniGirisPenceresi()
        self.yeni_giris_penceresi.show()

    def pdf_rapor_olustur(self, dosya_adi, plaka, surucu, kullanici_adi, rapor_tarihi, kayitlar):
        c = canvas.Canvas(dosya_adi, pagesize=A4)
        width, height = A4
        y = height - 50

        c.setFont("TurkceFont", 12)
        c.drawString(50, y, f"Araç Plakası: {plaka}")
        y -= 20
        c.drawString(50, y, f"Sürücü: {surucu}")
        y -= 20
        c.drawString(50, y, f"Bakımı Yapan: {kullanici_adi}")
        y -= 20
        c.drawString(50, y, f"Rapor Oluşturma Tarihi: {rapor_tarihi}")
        y -= 30

        onceki_bakim_no = None
        c.setFont("TurkceFont", 11)

        for bakim_no, detay, tarih in kayitlar:
            if bakim_no != onceki_bakim_no:
                c.setFont("TurkceFont", 11)
                c.drawString(50, y, f"--- Bakım {bakim_no} ({tarih}) ---")
                y -= 20
                onceki_bakim_no = bakim_no

            for satir in detay.split("\n"):
                c.drawString(60, y, satir.strip())
                y -= 18
                if y < 80:
                    c.showPage()
                    y = height - 50
                    c.setFont("TurkceFont", 11)

        c.save()

    def rapor_olustur(self):
        plaka = self.plaka_input.text().strip()
        kullanici_adi = self.kullanici_adi if hasattr(self, 'kullanici_adi') else "Belirtilmedi"

        if not plaka:
            QMessageBox.warning(self, "Uyarı", "Lütfen önce bir araç seçin.")
            return

        secenekler = ["Tüm Bakımlar", "Seçili Bakım"]
        secim, ok = QInputDialog.getItem(self, "Rapor Türü Seçimi", "Hangi bakımları raporlamak istersiniz?", secenekler, 0, False)
        if not ok:
            return

        surucu, ok2 = QInputDialog.getText(self, "Sürücü Bilgisi", "Aracı getiren kişinin adını girin:")
        if not ok2 or not surucu.strip():
            QMessageBox.warning(self, "Uyarı", "Sürücü bilgisi boş olamaz.")
            return

        try:
            conn = sqlite3.connect("kullanici_veritabani.db")
            cursor = conn.cursor()

            if secim == "Tüm Bakımlar":
                cursor.execute("SELECT bakim_no, detay, tarih FROM bakimlar WHERE plaka = ? ORDER BY bakim_no ASC", (plaka,))
                kayitlar = cursor.fetchall()
                dosya_adi = f"{plaka}_tum_bakimlar_raporu.pdf"
            else:
                secili_text = self.bakım_sayisi_combo.currentText()
                if not secili_text.startswith("Bakım "):
                    QMessageBox.warning(self, "Uyarı", "Lütfen geçerli bir bakım seçin.")
                    return
                bakim_no = int(secili_text.replace("Bakım ", ""))
                cursor.execute("SELECT bakim_no, detay, tarih FROM bakimlar WHERE plaka = ? AND bakim_no = ?", (plaka, bakim_no))
                kayitlar = cursor.fetchall()
                dosya_adi = f"{plaka}_bakim_{bakim_no}_raporu.pdf"

            conn.close()

            if not kayitlar:
                QMessageBox.information(self, "Bilgi", "İlgili bakım(lar) için kayıt bulunamadı.")
                return

            rapor_tarihi = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            self.pdf_rapor_olustur(dosya_adi, plaka, surucu.strip(), kullanici_adi, rapor_tarihi, kayitlar)
            if platform.system() == "Windows":
                os.startfile(dosya_adi)
            elif platform.system() == "Darwin":
                subprocess.call(["open", dosya_adi])
            else:
                subprocess.call(["xdg-open", dosya_adi])

            QMessageBox.information(self, "Rapor Hazır", f"{dosya_adi} başarıyla oluşturuldu!")

        except Exception as e:
            QMessageBox.critical(self, "Hata", f"Rapor oluşturulurken hata oluştu:\n{e}")

    
    def arac_sec_ac(self):
        self.arac_sec_penceresi = AracSecmePenceresi(self)
        self.arac_sec_penceresi.show()

# ---------------------------------- Bakım Ekleme Penceresi ----------------------------------
class BakimEklePenceresi(QMainWindow):
    def __init__(self, ana_ekran):
        super().__init__()
        self.ana_ekran = ana_ekran
        self.setWindowTitle("Bakım Ekle")
        self.setGeometry(300, 300, 400, 180)  
        center_window(self)

        self.plaka = self.ana_ekran.plaka_input.text().strip()
        self.bakim_no = 0  # Bu plaka için toplam bakım sayısı
        self.detay_sayisi = 0  # Bu pencere için açılan toplam detay sayısı
        self.detay_labelleri = []

        layout = QVBoxLayout()

        layout.setSpacing(5)
        layout.setContentsMargins(5, 5, 5, 5)

        # Plaka Bilgisi
        self.plaka_label = QLabel("Plaka:")
        self.plaka_input = QLineEdit()
        self.plaka_input.setText(self.plaka)
        self.plaka_input.setReadOnly(True)
        self.plaka_input.setStyleSheet("background-color: #f0f0f0;")
        layout.addWidget(self.plaka_label)
        layout.addWidget(self.plaka_input)

        # Dinamik Bakım Detayı Alanı
        self.detay_container = QVBoxLayout()
        layout.addLayout(self.detay_container)

        # + Butonu ile yeni bakım detayı ekleme
        self.ekle_button = QPushButton("+ Yeni Bakım Detayı")
        self.ekle_button.clicked.connect(self.yeni_bakim_detayi_ekle)
        layout.addWidget(self.ekle_button)

        # Kaydet Butonu
        self.kaydet_button = QPushButton("Kaydet")
        self.kaydet_button.clicked.connect(self.bakim_kaydet)
        layout.addWidget(self.kaydet_button)

        container = QWidget()
        container.setLayout(layout)
        self.setCentralWidget(container)

        # Mevcut bakım sayısını belirle
        self.bakim_sayisini_yukle()

    def yeni_bakim_detayi_ekle(self):
        self.detay_sayisi += 1
        detay_label = QLabel(f"Detay {self.detay_sayisi}:")
        detay_input = QLineEdit()
        self.detay_container.addWidget(detay_label)
        self.detay_container.addWidget(detay_input)
        self.detay_labelleri.append((detay_label, detay_input))

    def bakim_kaydet(self):
        try:
            conn = sqlite3.connect("kullanici_veritabani.db")
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS bakimlar (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    plaka TEXT,
                    bakim_no INTEGER,
                    detay TEXT,
                    tarih DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # Bu bakım için yeni numara belirle
            self.bakim_no += 1

            for index, (label, input_field) in enumerate(self.detay_labelleri, start=1):
                detay = input_field.text().strip()
                if detay:
                    tarih = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                cursor.execute("INSERT INTO bakimlar (plaka, bakim_no, detay, tarih) VALUES (?, ?, ?, ?)",
                            (self.plaka, self.bakim_no, detay, tarih))
            conn.commit()
            conn.close()
            QMessageBox.information(self, "Başarılı", "Bakım detayları kaydedildi!")
            self.close()

            # Ana ekrandaki bakım sayısını güncelle
            self.ana_ekran.bakim_sayisi_guncelle(self.plaka)

        except Exception as e:
            QMessageBox.critical(self, "Hata", f"Bakım kaydedilemedi: {e}")

    def bakim_sayisini_yukle(self):
        try:
            conn = sqlite3.connect("kullanici_veritabani.db")
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(DISTINCT bakim_no) FROM bakimlar WHERE plaka = ?", (self.plaka,))
            self.bakim_no = cursor.fetchone()[0]
            conn.close()
        except Exception as e:
            QMessageBox.critical(self, "Hata", f"Bakım sayısı yüklenemedi: {e}")

# ---------------------------------- Araç Seçme Penceresi ----------------------------------
class AracSecmePenceresi(QMainWindow):
    def __init__(self, ana_ekran):
        self.ana_ekran = ana_ekran
        super().__init__()
        self.setWindowTitle("Araç Seç")
        self.setGeometry(300, 300, 600, 450)
        center_window(self)

        self.search_input = QLineEdit()
        self.search_input.setPlaceholderText("Plaka / Marka / Model ile ara...")
        self.search_input.textChanged.connect(self.filtrele)

        self.table = QTableWidget()
        self.table.setColumnCount(5)
        self.table.setHorizontalHeaderLabels(["Plaka", "Marka", "Model", "Km", "Motor"])
        self.table.setEditTriggers(QTableWidget.NoEditTriggers)
        self.table.setSelectionBehavior(QTableWidget.SelectRows)

        self.table.setEditTriggers(QTableWidget.NoEditTriggers)


        # Butonlar
        self.sil_button = QPushButton("Sil")
        self.ac_button = QPushButton("Aç")
        self.duzenle_button = QPushButton("Düzenle")
        self.guncelle_button = QPushButton("Güncelle")


        self.sil_button.clicked.connect(self.arac_sil)
        self.guncelle_button.clicked.connect(self.arac_guncelle)
        self.duzenle_button.clicked.connect(self.arac_duzenle)
        self.ac_button.clicked.connect(self.arac_ac)

        button_layout = QHBoxLayout()
        button_layout.addWidget(self.sil_button)
        button_layout.addWidget(self.ac_button)
        button_layout.addWidget(self.duzenle_button)    
        button_layout.addWidget(self.guncelle_button)


        layout = QVBoxLayout()
        layout.addWidget(self.search_input)
        layout.addWidget(self.table)
        layout.addLayout(button_layout)

        container = QWidget()
        container.setLayout(layout)
        self.setCentralWidget(container)

        self.tum_veriler = []
        self.yukle_veriler()

    def arac_ac(self):
        row = self.table.currentRow()
        if row == -1:
            QMessageBox.warning(self, "Uyarı", "Lütfen bir araç seçin.")
            return

        plaka = self.table.item(row, 0).text()
        marka = self.table.item(row, 1).text()
        model = self.table.item(row, 2).text()
        motor = self.table.item(row, 4).text()

        # Ana ekrandaki alanlar
        self.ana_ekran.plaka_input.setText(plaka)
        self.ana_ekran.marka_input.setText(marka)
        self.ana_ekran.model_input.setText(model)
        self.ana_ekran.motor_input.setText(motor)

        # salt-okunur yapıyoruz
        self.ana_ekran.plaka_input.setReadOnly(True)
        self.ana_ekran.marka_input.setReadOnly(True)
        self.ana_ekran.model_input.setReadOnly(True)
        self.ana_ekran.motor_input.setReadOnly(True)

        # Ana ekrandaki bakım sayısını güncelle
        self.ana_ekran.bakim_sayisi_guncelle(plaka)
        # Ana ekranı göster
        self.close()

    def yukle_veriler(self):
        conn = sqlite3.connect('kullanici_veritabani.db')
        cursor = conn.cursor()
        cursor.execute("SELECT plaka, marka, model, km, motor FROM araclar")
        self.tum_veriler = cursor.fetchall()
        conn.close()
        self.tabloyu_doldur(self.tum_veriler)

    def tabloyu_doldur(self, veriler):
        self.table.setRowCount(len(veriler))
        for i, (plaka, marka, model, km, motor) in enumerate(veriler):
            self.table.setItem(i, 0, QTableWidgetItem(plaka))
            self.table.setItem(i, 1, QTableWidgetItem(marka or ""))
            self.table.setItem(i, 2, QTableWidgetItem(model or ""))
            self.table.setItem(i, 3, QTableWidgetItem(str(km) if km else ""))
            self.table.setItem(i, 4, QTableWidgetItem(motor or ""))
        self.table.resizeColumnsToContents()

    def filtrele(self, metin):
        metin = metin.lower()
        filtrelenmis = []
        for satir in self.tum_veriler:
            plaka, marka, model, km, motor = satir
            if (metin in str(plaka).lower() or
                metin in str(marka).lower() or
                metin in str(model).lower()):
                filtrelenmis.append(satir)
        self.tabloyu_doldur(filtrelenmis)

    def arac_sil(self):
        secili_satir = self.table.currentRow()
        if secili_satir == -1:
            QMessageBox.warning(self, "Uyarı", "Lütfen silmek için bir araç seçin.")
            return

        plaka_item = self.table.item(secili_satir, 0)
        if not plaka_item:
            QMessageBox.warning(self, "Hata", "Plaka bilgisi alınamadı.")
            return

        plaka = plaka_item.text()

        onay = QMessageBox.question(self, "Silme Onayı", f"{plaka} plakalı aracı silmek istediğinize emin misiniz?",
                                     QMessageBox.Yes | QMessageBox.No)

        if onay == QMessageBox.Yes:
            try:
                conn = sqlite3.connect('kullanici_veritabani.db')
                cursor = conn.cursor()
                cursor.execute("DELETE FROM araclar WHERE plaka = ?", (plaka,))
                conn.commit()
                conn.close()
                QMessageBox.information(self, "Başarılı", f"{plaka} plakalı araç silindi.")
                self.yukle_veriler()
            except Exception as e:
                QMessageBox.critical(self, "Hata", f"Silme sırasında hata oluştu:\n{str(e)}")

    def arac_guncelle(self):
        row = self.table.currentRow()
        if row == -1:
            QMessageBox.warning(self, "Uyarı", "Güncellemek için bir satır seçin.")
            return

        # Hücredeki son düzenlemeyi commit et
        self.table.clearFocus()

        # Orijinal plakayı al
        original_plaka = self.tum_veriler[row][0]  # veya: self.table.item(row, 0).text().strip()

        # Yeni değerleri oku
        new_plaka = self.table.item(row, 0).text().strip()
        new_marka = self.table.item(row, 1).text().strip()
        new_model = self.table.item(row, 2).text().strip()
        km_text   = self.table.item(row, 3).text().strip().replace(".", "").replace(",", "")
        new_km    = int(km_text)
        new_motor = self.table.item(row, 4).text().strip()

        try:
            conn = sqlite3.connect("kullanici_veritabani.db")
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE araclar
                SET plaka = ?, marka = ?, model = ?, km = ?, motor = ?
                WHERE plaka = ?
            """, (new_plaka, new_marka, new_model, new_km, new_motor, original_plaka))
            conn.commit()
            conn.close()

            # Düzenlemeyi kapat ve tabloyu yenile
            self.table.setEditTriggers(QTableWidget.NoEditTriggers)
            QMessageBox.information(self, "Başarılı", "Araç bilgileri güncellendi.")
            self.yukle_veriler()

        except sqlite3.IntegrityError:
            QMessageBox.warning(self, "Hata", "Yeni plaka zaten kayıtlı!")
        except Exception as e:
            QMessageBox.critical(self, "Hata", f"Güncelleme hatası: {e}")

    def arac_duzenle(self):
        row = self.table.currentRow()
        if row == -1:
            QMessageBox.warning(self, "Uyarı", "Düzenlemek için bir araç seçin.")
            return

    # Sadece seçili satırı düzenlemeye aç
        self.table.setEditTriggers(QTableWidget.AllEditTriggers)

        QMessageBox.information(self, "Düzenleme Açık", "Seçilen satırda düzenlemeyi yaptıktan sonra 'Güncelle'ye basın.")

# ---------------------------------- Yeni Giriş Penceresi ----------------------------------
class YeniGirisPenceresi(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Yeni Giriş")
        self.setGeometry(250, 250, 400, 350)
        center_window(self)

        layout = QVBoxLayout()

        self.plaka_label = QLabel("Plaka:")
        self.plaka_label.setStyleSheet("font-weight: bold; font-size: 14px;")
        self.plaka_input = QLineEdit()
        self.plaka_input.setPlaceholderText("Plakayı girin")

        self.marka_label = QLabel("Marka:")
        self.marka_label.setStyleSheet("font-weight: bold; font-size: 14px;")
        self.marka_input = QLineEdit()
        self.marka_input.setPlaceholderText("Araç markasını girin")

        self.model_label = QLabel("Model:")
        self.model_label.setStyleSheet("font-weight: bold; font-size: 14px;")
        self.model_input = QLineEdit()
        self.model_input.setPlaceholderText("Araç modelini girin")

        self.km_label = QLabel("Kilometre:")
        self.km_label.setStyleSheet("font-weight: bold; font-size: 14px;")
        self.km_input = QLineEdit()
        self.km_input.setPlaceholderText("Araç kilometresi")

        self.motor_label = QLabel("Motor:")
        self.motor_label.setStyleSheet("font-weight: bold; font-size: 14px;")
        self.motor_input = QLineEdit()
        self.motor_input.setPlaceholderText("Motor bilgilerini girin")

        from datetime import datetime
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.datetime_label = QLabel(f"Tarih & Saat: {now}")
        self.datetime_label.setStyleSheet("font-size: 12px; color: gray;")

        self.kaydet_button = QPushButton("Kaydet")
        self.kaydet_button.clicked.connect(self.veriyi_kaydet)

        layout.addWidget(self.plaka_label)
        layout.addWidget(self.plaka_input)
        layout.addWidget(self.marka_label)
        layout.addWidget(self.marka_input)
        layout.addWidget(self.model_label)
        layout.addWidget(self.model_input)
        layout.addWidget(self.km_label)
        layout.addWidget(self.km_input)
        layout.addWidget(self.motor_label)
        layout.addWidget(self.motor_input)
        layout.addWidget(self.datetime_label)
        layout.addWidget(self.kaydet_button)

        container = QWidget()
        container.setLayout(layout)
        self.setCentralWidget(container)

    def veriyi_kaydet(self):
        plaka = self.plaka_input.text().strip()
        marka = self.marka_input.text().strip()
        model = self.model_input.text().strip()
        km = self.km_input.text().strip()
        motor = self.motor_input.text().strip()

        if not (plaka and marka and model and km and motor):
            QMessageBox.warning(self, "Eksik Bilgi", "Tüm Alanları Doldurunuz!")
            return

        try:
            conn = sqlite3.connect("kullanici_veritabani.db")
            cursor = conn.cursor()

            # Eğer tablo yoksa oluştur 
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS araclar (
                    plaka TEXT PRIMARY KEY,
                    marka TEXT,
                    model TEXT,
                    km TEXT,
                    motor TEXT
                )
            """)

            cursor.execute("""
                INSERT INTO araclar (plaka, marka, model, km, motor)
                VALUES (?, ?, ?, ?, ?)
            """, (plaka, marka, model, km, motor))

            conn.commit()
            conn.close()

            QMessageBox.information(self, "Başarılı", "Araç başarıyla eklendi!")
            self.close()  # pencereyi kapat 

        except sqlite3.IntegrityError:
            QMessageBox.warning(self, "Hata", "Bu plaka zaten kayıtlı!")
        except Exception as e:
            QMessageBox.critical(self, "Hata", f"Kayıt başarısız oldu!\n{str(e)}")

# ---------------------------------- Bakım Detayı Penceresi ----------------------------------
class BakimDetayPenceresi(QMainWindow):
    def __init__(self, ana_ekran):
        super().__init__()
        self.ana_ekran = ana_ekran
        self.setWindowTitle("Bakım Detayı")
        self.setGeometry(300, 300, 600, 500)
        center_window(self)

        self.detay_inputs = []

        layout = QVBoxLayout()
        layout.setSpacing(8)

        self.plaka = self.ana_ekran.plaka_input.text().strip()
        secilen_bakim = self.ana_ekran.bakım_sayisi_combo.currentText().strip()
        self.bakim_no = int(secilen_bakim.replace("Bakım ", "")) if secilen_bakim.startswith("Bakım ") else 0

        if self.bakim_no < 1:
            QMessageBox.warning(self, "Hata", "Lütfen geçerli bir bakım seçin.")
            self.close()
            return

        self.bakim_label = QLabel(f"Bakım {self.bakim_no} Detayları:")
        self.bakim_label.setStyleSheet("font-weight: bold; font-size: 16px; margin-bottom: 10px;")
        layout.addWidget(self.bakim_label)

        self.bakim_detaylarini_yukle(layout)

        # Butonlar
        self.kaydet_button = QPushButton("Kaydet")
        self.kaydet_button.clicked.connect(self.bakim_guncelle)

        self.sil_button = QPushButton("Sil")
        self.sil_button.clicked.connect(self.bakim_sil)

        button_layout = QHBoxLayout()
        button_layout.addWidget(self.kaydet_button)
        button_layout.addWidget(self.sil_button)
        layout.addLayout(button_layout)

        container = QWidget()
        container.setLayout(layout)
        self.setCentralWidget(container)

        self.adjustSize()

    def bakim_detaylarini_yukle(self, layout):
        try:
            conn = sqlite3.connect("kullanici_veritabani.db")
            cursor = conn.cursor()
            cursor.execute("SELECT id, detay FROM bakimlar WHERE plaka = ? AND bakim_no = ?", (self.plaka, self.bakim_no))
            detaylar = cursor.fetchall()
            conn.close()

            if detaylar:
                for index, (detay_id, detay) in enumerate(detaylar, start=1):
                    detay_label = QLabel(f"Detay {index}:")
                    detay_input = QLineEdit()
                    detay_input.setText(detay)
                    detay_input.setStyleSheet("background-color: #f0f0f0; font-weight: normal; padding: 5px; margin-bottom: 5px; width: 500px;")
                    layout.addWidget(detay_label)
                    layout.addWidget(detay_input)
                    self.detay_inputs.append((detay_id, detay_input))
            else:
                layout.addWidget(QLabel("Bu bakım için henüz kayıtlı detay yok."))

        except Exception as e:
            QMessageBox.critical(self, "Hata", f"Bakım detayı yüklenemedi: {e}")

    def bakim_guncelle(self):
        try:
            conn = sqlite3.connect("kullanici_veritabani.db")
            cursor = conn.cursor()
            for detay_id, input_field in self.detay_inputs:
                yeni_detay = input_field.text().strip()
                cursor.execute("UPDATE bakimlar SET detay = ? WHERE id = ?", (yeni_detay, detay_id))
            conn.commit()
            conn.close()
            QMessageBox.information(self, "Başarılı", "Bakım detayları güncellendi.")
        except Exception as e:
            QMessageBox.critical(self, "Hata", f"Güncelleme başarısız: {e}")

    def bakim_sil(self):
        cevap = QMessageBox.question(self, "Onay", f"Bakım {self.bakim_no} tamamen silinsin mi?", QMessageBox.Yes | QMessageBox.No)
        if cevap == QMessageBox.Yes:
            try:
                conn = sqlite3.connect("kullanici_veritabani.db")
                cursor = conn.cursor()
                cursor.execute("DELETE FROM bakimlar WHERE plaka = ? AND bakim_no = ?", (self.plaka, self.bakim_no))
                conn.commit()
                conn.close()
                QMessageBox.information(self, "Silindi", "Bakım başarıyla silindi.")
                self.close()
                self.ana_ekran.bakim_sayisi_guncelle(self.plaka)
            except Exception as e:
                QMessageBox.critical(self, "Hata", f"Silme işlemi başarısız: {e}")

# ---------------------------------- Ayarlar Penceresi ----------------------------------
class AyarlarPenceresi(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Ayarlar")
        self.setGeometry(250, 250, 350, 200)
        center_window(self)

        layout = QVBoxLayout()
        self.label = QLabel("Ayarlar ekranına hoş geldiniz!")
        self.label.setAlignment(Qt.AlignCenter)

        layout.addWidget(self.label)
        container = QWidget()
        container.setLayout(layout)
        self.setCentralWidget(container)

# ---------------------------------- Uygulama Başlatma ----------------------------------
if __name__ == "__main__":
    app = QApplication(sys.argv)
    login_ekrani = LoginEkranı()
    login_ekrani.show()
    sys.exit(app.exec_())

`;

  const handleCardClick = (img) => setOpenImg(img);
  const closeModal = () => setOpenImg(null);

  return (
    <>
      <section id="portfolio" className="portfolio-section">
        <div className="decor-separator">
          <span className="line"></span>
          <span className="star">*</span>
          <span className="line"></span>
        </div>
        <h2 style={{ textAlign: "center" }}>Portfolyo</h2>
        <div className="portfolio-container">
          {/* 1. Kart */}
          <div className="card" onClick={() => handleCardClick(WebSitesiImg)} style={{ cursor: "pointer" }}>
            <img src={WebSitesiImg} alt="Proje 1" className="card-img" />
            <div className="card-body">
              <h3 className="card-title">İlk İnternet Sitem</h3>
              <p className="card-desc">Kendimi ve projelerimi tanıttığım kişisel portfolyo sitesi.</p>
              <strong className="card-desc">Kullanılan Teknolojiler</strong>
              <p className="card-desc">HTML, CSS, JavaScript</p>
              <a
                href="#"
                className="card-link"
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  alert("İncelemek için sağ tık → İncele veya F12 tuşuna basabilirsin.");
                }}
              >
                Kaynak Kodu İncele
              </a>
            </div>
          </div>
          {/* 2. Kart */}
          <div className="card" onClick={() => handleCardClick(OtoServis)} style={{ cursor: "pointer" }}>
            <img src={OtoServis} alt="Proje 2" className="card-img" />
            <div className="card-body">
              <h3 className="card-title">Oto Servis</h3>
              <p className="card-desc">Araç bakım ve servis yönetim sistemi.</p>
              <strong className="card-desc">Kullanılan Teknolojiler</strong>
              <p className="card-desc">Python, PyQt5, SQLite</p>
              <a
                href="#"
                className="card-link"
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  setShowCodeModal(true);
                }}
              >
                Kaynak Kodu İncele
              </a>
            </div>
          </div>
        </div>

        {/* Modal: Fotoğraf */}
        {openImg && (
          <div className="modal-bg" onClick={closeModal}>
            <img
              src={openImg}
              alt="Büyük görsel"
              className="modal-img"
              
            />
          </div>
        )}

        {/* Modal: Kaynak Kod */}
        {showCodeModal && (
          <div className="modal-bg" onClick={() => setShowCodeModal(false)}>
            <div className="code-modal" onClick={e => e.stopPropagation()}>
              <pre style={{ whiteSpace: "pre-wrap", margin: 0, fontSize: "1rem", color: "#333" }}>
                {sourceCode}
              </pre>
              <button
                className="close-btn"
                onClick={() => setShowCodeModal(false)}
                style={{
                  marginTop: "20px",
                  padding: "8px 18px",
                  background: "#1256b1",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                Kapat
              </button>
            </div>
          </div>
        )}
      </section>
      <style>{`
        .portfolio-section {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .decor-separator {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 24px 0;
        }
        .line {
          display: inline-block;
          width: 80px;
          height: 2px;
          background: #ccc;
          margin: 0 12px;
        }
        .star {
          font-size: 2rem;
          color: #888;
        }
        .portfolio-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          justify-content: center;
          margin-top: 32px;
          width: 90%;
          max-width: 1100px;
          align-items: stretch;

        }
        .card {
           display: flex;
            flex-direction: column;
            background: rgba(255,255,255,0.18);
            backdrop-filter: blur(9px);
            border-radius: 18px;
            box-shadow: 0 2px 18px rgba(0,0,0,0.13);
            border: 1.5px solid rgba(255,255,255,0.21);
            min-height: 390px;      /* Kartların en az bu kadar olması için */
            height: 100%;           /* Grid ile uyum için */
            overflow: hidden;
            transition: transform .25s, box-shadow .25s, background .15s;
        }
        .card:hover {
          transform: scale(1.04) translateY(-4px);
          background: rgba(255,255,255,0.24);
          box-shadow: 0 8px 28px rgba(34,34,34,0.15);
        }
        .card-img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          display: block;
        }
        .card-body {
          padding: 18px;
          display: flex;
          flex-direction: column;
          flex: 1;               
          justify-content: space-between;
        }
        .card-title {
          font-size: 1.3rem;
          margin: 0 0 10px 0;
          font-weight: 600;
        }
        .card-desc {
          font-size: 1rem;
          color: #444;
        }
        .card-link {
          display: inline-block;
          margin-top: 14px;
          text-decoration: none;
          color: #2186eb;
          font-weight: bold;
          transition: color 0.2s;
        }
        .card-link:hover {
          color: #1256b1;
        }
        @media (max-width: 800px) {
          .portfolio-container {
            flex-direction: column;
            align-items: center;
          }
        }
        #portfolio {
          scroll-margin-top: 70px; /* Navbar'ın yüksekliği kadar boşluk bırak */
        }

        /* MODAL STİLİ */
        .modal-bg {
          position: fixed;
          z-index: 1002;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeInBg .2s;
        }
        .modal-img {
          max-width: 90vw;
          max-height: 85vh;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          background: #fff;
          animation: popUp .2s;
          cursor: pointer;
        }
        .code-modal {
          background: #f5f5f5;
          padding: 32px 18px 18px 18px;
          border-radius: 16px;
          max-width: 90vw;
          min-width: 350px;
          max-height: 80vh;
          overflow: auto;
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
          animation: popUp .2s;
        }
        .close-btn {
          display: block;
          margin: 0 auto;
        }
        @keyframes fadeInBg {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes popUp {
          from { transform: scale(0.85); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}

export default Portfolio;
