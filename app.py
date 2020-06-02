# -*- coding: utf-8 -*-
"""
Created on Sat May 30 20:37:54 2020

@author: nehagupta13
"""
import os
os.chdir('C:/Users/nehagupta13/Projects/learning/Image_Processong/')
import sys
import subprocess 
import pandas as pd

from playsound import playsound
import googletrans
from googletrans import Translator
translator = Translator()

from tkinter import *

import tkinter as tk
top = tk.Tk()
# Code to add widgets will go here...
top.title("Form Filling GUI")
top.geometry('500x400')
#label = tk.Label(top, text = "Welcome to DataCamp's Tutorial on Tkinter!").pack()


text_ent = tk.Label(top, text = 'Enter first name:',font = ('arial', 12) )
text_ent.grid(row=2, columnspan = 2)

button = tk.Button(top, text='Click', width=15, bg="orange", fg="black", command = lambda: clicked()) #, command=m.destroy
button.grid(row=2, column =5)
fn = []
def clicked():
    
    #playsound('file_example_WAV_1MG.wav') 
    a1 = subprocess.check_output([sys.executable, "speech_text_Google_API.py"])
    print(a1)
    a1 = a1.decode('utf-8')
    fn.append(a1.replace('\r\n',''))
    a1r= translator.translate(a1, dest = 'hi')
    res = tk.Label(top, text = a1r.text,  font = ('arial', 18, 'bold'))
    res.grid(row = 4, column = 1)
   # a1r1= translator.translate(a1.decode('utf-8'), dest = 'en')
   # res1 = tk.Label(top, text = a1r1.text,  font = ('arial', 18, 'bold'))
   # res1.grid(row = 4, column = 4)

#####
text_ent = tk.Label(top, text = 'Enter Middle name:',font = ('arial', 12) )
text_ent.grid(row=8, columnspan = 2)

button = tk.Button(top, text='Click', width=15, bg="orange", fg="black", command = lambda: clicked1()) #, command=m.destroy
button.grid(row=8, column =5)
mn= []
def clicked1():
    
    #playsound('file_example_WAV_1MG.wav') 
    a2 = subprocess.check_output([sys.executable, "speech_text_Google_API.py"])
    print(a2)
    a2 = a2.decode('utf-8')
    mn.append(a2.replace('\r\n',''))
    a2r = translator.translate(a2, dest = 'hi')
    res = tk.Label(top, text = a2r.text, wraplength=1500, font = ('arial', 18, 'bold'))
    res.grid(row = 10, column = 1)
    #a2r1= translator.translate(a2, dest = 'en')
    #res1 = tk.Label(top, text = a2r1.text,  font = ('arial', 18, 'bold'))
    #res1.grid(row = 10, column = 4)

#####
text_ent = tk.Label(top, text = 'Enter Last Name:',font = ('arial', 12) )
text_ent.grid(row=14, columnspan = 2)

button = tk.Button(top, text='Click', width=15, bg="orange", fg="black", command = lambda: clicked2()) #, command=m.destroy
button.grid(row=14, column =5)
ln = []
def clicked2():
    #playsound('file_example_WAV_1MG.wav') 
    a = subprocess.check_output([sys.executable, "speech_text_Google_API.py"])
    print(a)
    a = a.decode('utf-8')
    ln.append(a.replace('\r\n',''))
    a2r = translator.translate(a, dest = 'hi')
    res = tk.Label(top, text = a2r.text, wraplength=1500,font = ('arial', 18, 'bold'))
    res.grid(row = 16, column = 1)


#####
text_ent = tk.Label(top, text = 'Enter Gender:',font = ('arial', 12) )
text_ent.grid(row=22, columnspan = 2)
gn = 'Male'
CheckVar1 = IntVar()
CheckVar2 = IntVar()
CheckVar3 = IntVar()
C1 = Checkbutton(top, text = "Male", variable = CheckVar1).grid(row=23,column = 1, sticky=W)
C2 = Checkbutton(top, text = "Female", variable = CheckVar2, 
                 onvalue = 1, offvalue = 0).grid(row=23, column = 2, sticky=W)
C3 = Checkbutton(top, text = "Others", variable = CheckVar3, 
                 onvalue = 1, offvalue = 0).grid(row=23, column = 3, sticky=W)

def var_states():
   print("male: %d,\nfemale: %d,\nLGBT: %d" % (CheckVar1.get(), CheckVar2.get(),CheckVar3.get()))
   if(CheckVar2.get()==1):
       gn = 'Female'
       print(gn)
   if(CheckVar3.get()==1):
       gn = 'Others'
       print(gn)
       

Button(top, text='Submit', command=var_states).grid(row=23, column = 4, sticky=W, pady=4)

#####

#####
text_ent = tk.Label(top, text = 'Are you Married?:',font = ('arial', 12) )
text_ent.grid(row=25, columnspan = 2)
mm = 'Yes'
m1 = IntVar()
m2 = IntVar()

C1 = Checkbutton(top, text = "Yes", variable = m1).grid(row=26,column = 1, sticky=W)
C2 = Checkbutton(top, text = "No", variable = m2, 
                 onvalue = 1, offvalue = 0).grid(row=26, column = 2, sticky=W)

def var_states1():
  # print("male: %d,\nfemale: %d,\nLGBT: %d" % (CheckVar1.get(), CheckVar2.get()))
   if(m2.get()==1):
       mm = 'No'
       print(mm)
 
Button(top, text='Submit', command=var_states1).grid(row=26, column = 4, sticky=W, pady=4)

#####
text_ent = tk.Label(top, text = 'Enter Educational Qualification:',font = ('arial', 12) )
text_ent.grid(row=28, columnspan = 2)

button = tk.Button(top, text='Click', width=15, bg="orange", fg="black", command = lambda: clicked3()) #, command=m.destroy
button.grid(row=28, column =5)
ed= []
def clicked3():
    #playsound('file_example_WAV_1MG.wav') 
    a2 = subprocess.check_output([sys.executable, "speech_text_Google_API.py"])
    print(a2)
    a2 = a2.decode('utf-8')
    ed.append(a2.replace('\r\n',''))
    a2r = translator.translate(a2, dest = 'hi')
    res = tk.Label(top, text = a2r.text, wraplength=1500, font = ('arial', 18, 'bold'))
    res.grid(row = 30, column = 1)
    a2r1= translator.translate(a2, dest = 'en')
    res1 = tk.Label(top, text = a2r1.text,  font = ('arial', 18, 'bold'))
    res1.grid(row = 30, column = 4)

#####

#####
text_ent = tk.Label(top, text = 'Enter Primary skills:',font = ('arial', 12) )
text_ent.grid(row=32, columnspan = 2)

button = tk.Button(top, text='Click', width=15, bg="orange", fg="black", command = lambda: clicked4()) #, command=m.destroy
button.grid(row=32, column =5)
ps= []
def clicked4():
    #playsound('file_example_WAV_1MG.wav') 
    a2 = subprocess.check_output([sys.executable, "speech_text_Google_API.py"])
    print(a2)
    a2 = a2.decode('utf-8')
    ps.append(a2.replace('\r\n',''))
    a2r = translator.translate(a2, dest = 'hi')
    res = tk.Label(top, text = a2r.text, wraplength=1500, font = ('arial', 18, 'bold'))
    res.grid(row = 34, column = 1)
    a2r1= translator.translate(a2, dest = 'en')
    res1 = tk.Label(top, text = a2r1.text,  font = ('arial', 18, 'bold'))
    res1.grid(row = 34, column = 4)

#####
    
#####
text_ent = tk.Label(top, text = 'Enter Secondary skills:',font = ('arial', 12) )
text_ent.grid(row=36, columnspan = 2)

button = tk.Button(top, text='Click', width=15, bg="orange", fg="black", command = lambda: clicked5()) #, command=m.destroy
button.grid(row=36, column =5)
ss= []
def clicked5():
    #playsound('file_example_WAV_1MG.wav') 
    a2 = subprocess.check_output([sys.executable, "speech_text_Google_API.py"])
    print(a2)
    a2 = a2.decode('utf-8')
    ss.append(a2.replace('\r\n',''))
    a2r = translator.translate(a2, dest = 'hi')
    res = tk.Label(top, text = a2r.text, wraplength=1500, font = ('arial', 18, 'bold'))
    res.grid(row = 38, column = 1)
    a2r1= translator.translate(a2, dest = 'en')
    res1 = tk.Label(top, text = a2r1.text,  font = ('arial', 18, 'bold'))
    res1.grid(row = 38, column = 4)

#####
    
text_ent = tk.Label(top, text = 'Enter Aadhar number:',font = ('arial', 12) )
text_ent.grid(row=40, columnspan = 2)

button = tk.Button(top, text='Click', width=15, bg="orange", fg="black", command = lambda: clicked6()) #, command=m.destroy
button.grid(row=40, column =5)
ad = []
def clicked6():
    #playsound('file_example_WAV_1MG.wav') 
    a = subprocess.check_output([sys.executable, "speech_text_Google_API.py"])
    print(a)
    ad.append(a)
    res = tk.Label(top, text = a, wraplength=1500)
    res.grid(row = 42, column = 1)

#####
    
text_ent = tk.Label(top, text = 'Enter Mobile number:',font = ('arial', 12) )
text_ent.grid(row=44, columnspan = 2)

button = tk.Button(top, text='Click', width=15, bg="orange", fg="black", command = lambda: clicked7()) #, command=m.destroy
button.grid(row=44, column =5)
mn = []
def clicked7():
    #playsound('file_example_WAV_1MG.wav') 
    a = subprocess.check_output([sys.executable, "speech_text_Google_API.py"])
    print(a)
    mn.append(a)
    res = tk.Label(top, text = a, wraplength=1500)
    res.grid(row = 46, column = 1)

##
text_ent = tk.Label(top, text = 'Enter DOB',font = ('arial', 12) )
text_ent.grid(row=48, columnspan = 2)

button = tk.Button(top, text='Click', width=15, bg="orange", fg="black", command = lambda: clicked8()) #, command=m.destroy
button.grid(row=48, column =5)
db = []
def clicked8():
    #playsound('file_example_WAV_1MG.wav') 
    a = subprocess.check_output([sys.executable, "speech_text_Google_API.py"])
    print(a)
    db.append(a)
    res = tk.Label(top, text = a, wraplength=1500)
    res.grid(row = 50, column = 1)
    
d = {'FIRST_NAME' :fn,'MIDDLE_NAME' : mn, 'LAST_NAME' : ln,'GENDER' : gn,
      'MARITAL_STATUS' : mm,
      'EDUCATION_DEGREE' :ed,
      'PRIMARY_SKILLS': ps,
      'SECONDARY_SKILLS' :ss,
      'AADHAR_NUMBER' : ad,
      'MOBILE_NUMBER' :mn,
      'DATE_OF_BIRTH' : db}
df = pd.DataFrame(d)

df.to_csv()
top.mainloop()