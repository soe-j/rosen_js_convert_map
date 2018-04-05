# 計算
## アイデア
+ 3つの円、それぞれの交線(3円交線)は1つに交わる。そこが震源地。
## 方程式
+ 円aと円bの交点を結ぶ直線
~~~
KX+MY+N = 0
K = 2(Xb-Xa)
M = 2(Yb-Ya)
N = (Xa-Xb)(Xa+Xb)+(Ya-Yb)(Ya+Yb)-(Ra-Rb)(Ra+Rb)
~~~
+ 円bと円cの交点を結ぶ直線
~~~
SX+TY+U = 0
S = 2(Xc-Xb)
T = 2(Yc-Yb)
U = (Xb-Xc)(Xb+Xc)+(Yb-Yc)(Yb+Yc)-(Rb-Rc)(Rb+Rc)
~~~
+ それらの交点
~~~
KX+MY+N = 0
Y = -(KX+N)/M

SX+TY+U = 0
SX+T(-(KX+N)/M)+U = 0
M(SX+U) = T(KX+N)
MSX-TKX = TN-MU
X = (TN-MU)/(MS-TK)

Y = -(KX+N)/M
Y = -(K(TN-MU)/(MS-TK)+N)/M
MY = -(K(TN-MU)/(MS-TK)+N)
-MY(MS-TK) = (KTN-KMU)+(NMS-KTN)
           = NMS - KMU
           = M(NS-KU)
-MY(MS-TK) = M(NS-KU)
Y(MS-TK) = (KU-NS)
Y = (KU-NS)/(MS-TK)
~~~
## 必要な式
~~~
K = 2 * (Xb - Xa)
M = 2 * (Yb - Ya)
N = (Xa - Xb) * (Xa + Xb) + (Ya - Yb) * (Ya + Yb) - (Ra - Rb) * (Ra + Rb)
S = 2 * (Xc - Xb)
T = 2 * (Yc - Yb)
U = (Xb - Xc) * (Xb + Xc) + (Yb - Yc) * (Yb + Yc) - (Rb - Rc) * (Rb + Rc)
X = (TN - MU) / (MS - TK)
Y = (KU - NS) / (MS - TK)
~~~
