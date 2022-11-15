---
title: Bedah Kode - Seleksi Olimpiade
cover_title: Seleksi Olimpiade - TLX TOKI
path: /bedah-kode-seleksi-olimpiade-tlx-toki
date: 2022-11-15
summary: Bedah Kode Soal Seleksi Olimpiade kategori Pemrograman Kompetitif Dasar TLX TOKI
tags: ['tlxtoki', 'bedah-kode', 'pkd']
categories: ['bedahkode']
is_archived: false
thumbnail: ./covers/seleksi-olimpiade-tlx-toki.png
author: Tio Irawan
---

Halo gaes, kali ini kita akan membahas soal pertama dari materi [Pemrograman Kompetitif Dasar](https://tlx.toki.id/courses/competitive/chapters/01/problems/A) dari [TLX TOKI](https://tlx.toki.id/).

Untuk soalnya dapat kalian lihat di [sini](https://tlx.toki.id/courses/competitive/chapters/01/problems/A).

## Deskripsi Soal

Secara garis besar, pada soal ini kita diminta untuk menentukan, apakah suatu peserta dinyatakan lulus dari hasil penilaian yang telah disediakan.

Penilaian dilakukan berdasarkan dari nilai 3 sesi seleksi. Uniknya adalah peserta akan disaring berdasarkan nilai sesi ke 3, jika ada peserta dengan nilai sesi ke 3 yang sama, maka peserta tersebut akan disaring berdasarkan nilai sesi ke 2, dan seterusnya. Untungnya pada kasus ini hanya terdapat 3 sesi aja. Masih kurang jelas? Yuk kita lihat contoh soalnya.

## Contoh Soal

Okay, sebelum kita melihat contoh input, kita coba lihat gambaran dari data yang akan kita olah. Jadi pertama kita akan disediakan nilai-nilai peserta seperti berikut.


| ID Peserta | Sesi 1 | Sesi 2 | Sesi 3 |
|------------|--------|--------|--------|
| P0001      | 10     | 100    | 100    |
| P0002      | 0      | 0      | 200    |
| P0003      | 1      | 100    | 100    |

Anggap saja pada seleksi ini kita akan menyaring 2 peserta saja. Berikut tahapanya:

  1. Pertama kita akan mengurutkan nilai sesi 3 dari yang terbesar ke terkecil. Jadi hasilnya akan seperti berikut.

| ID Peserta | Sesi 1 | Sesi 2 | Sesi 3 |
|------------|--------|--------|--------|
| P0002      | 0      | 0      | 200    |
| P0001      | 10     | 100    | 100    |
| P0003      | 1      | 100    | 100    |

   2. Jika kita lihat, nilai sesi 3 dari P0001 dan P0003 sama, maka kita akan mengurutkan berdasarkan nilai sesi 2. Ternyata nilai sesi 2 mereka juga sama, maka kita akan mengurutkan berdasarkan nilai sesi 1. Ternyata nilai sesi 1 dari P0001 lebih besar daripada P0003. Jadi dapat kita simpulkan bahwa P0001 akan dinyatakan lulus.

Dari tabel di atas kita udah bisa nyimpulin peserta mana aja nih yang bakal menang. Nah tapi, pada soal ini kita disuruh nentuin apakah seorang peserta yang diberikan ID nya akan dinyatakan lulus atau tidak. Yuk langsung liat aja contoh input & outputnya.

## Format Input dan Output

### Format Input

> Baris pertama berisi sebuah bilangan bulat T yaitu banyaknya seleksi yang diadakan. Untuk setiap seleksi, baris pertama berisi dua buah bilangan bulat N dan M. Baris kedua berisi ID peserta yang Anda perlu tentukan kelulusannya. N baris berikutnya masing-masing berisi ID peserta diikuti nilai sesi 1, sesi 2, dan sesi 3 secara berurutan masing-masing dipisahkan sebuah spasi.

### Format Keluaran

> T buah baris, masing-masing berisi YA jika pada seleksi yang bersangkutan peserta yang ID-nya diberikan di baris kedua lulus, atau TIDAK jika tidak lulus.

### Input
```bash
2
3 1
P0001
P0001 10 100 100
P0002 0 0 200
P0003 1 100 100
3 2
P0001
P0001 10 100 100
P0002 0 0 200
P0003 1 100 100
```

### Output
```bash
TIDAK
YA
```

## Lets Solve!

Nggak pake lama, ini sebenernya solusinya simpel banget gaes. Kita tinggal pakai fungsi
`sort` dan custom *comparator*. Jadi comparator ini yang nantinya buat nentuin gimana
cara si fungsi `sort` sorting datanya.

Sebelum itu, kita butuh sebuah model data untuk nyimpen id dan nilai-nilai peserta. Karena aku di sini pakai bahasa C++, jadi datanya bisa dimodel pakai struct.

```cpp
struct peserta {
  string id;
  int s1, s2, s3;
};
```

Okay, sekarang let's say kita punya data array peserta.

```cpp
peserta data[] = {
  {"P0001", 10, 100, 100},
  {"P0002", 0, 0, 200},
  {"P0003", 1, 100, 100}
};
```

Kita tinggal panggil fungsi `sort` untuk data peserta dan custom comparator yang akan kita buat.

```cpp
sort(data, data + 3, comparator);
```

Untuk comparatornya, kita tinggal bandingin aja nilai tiap sesinya. Pertama sesi 3, kalau nilainya sama, kita bandingin sesi 2, dst.
  
```cpp
void comparator(peserta a, peserta b) {
  if (a.s3 != b.s3) return a.s3 > b.s3;
  if (a.s2 != b.s2) return a.s2 > b.s2;
  return a.s1 > b.s1;
}
```

Nah, setelah datanya udah disort, kita tinggal cari aja, apa ID peserta yang dimasukkin
ada di *TOP M* peserta.

```cpp
bool isLulus = false;

for (int i = 0; i < M; i++) {
  if (data[i].id == id) {
    isLulus = true;
    break;
  }
}
```

That's it! simpel kan? Jadi sekarang tinggal kita implementasikan ke soalnya.

## Final Solution

```cpp
#include <bits/stdc++.h>
#define FAST                        \
  ios_base::sync_with_stdio(false); \
  cin.tie(NULL);
#define MOD 1000000007
typedef long long ll;

using namespace std;

struct peserta {
  string id;
  int s1, s2, s3;
};

bool cp(peserta a, peserta b) {
  if (a.s3 != b.s3) return a.s3 > b.s3;
  if (a.s2 != b.s2) return a.s2 > b.s2;
  return a.s1 > b.s1;
}

void solve() {
  int N, M;
  string ID;

  cin >> N >> M >> ID;

  peserta sc[N];

  for (int i = 0; i < N; i++) {
    cin >> sc[i].id >> sc[i].s1 >> sc[i].s2 >> sc[i].s3;
  }

  sort(sc, sc + N, cp);

  bool qul = false;

  for (int i = 0; i < M; i++) {
    if (sc[i].id == ID) {
      qul = true;
      break;
    }
  }

  if (qul) {
    cout << "YA" << "\n";
  } else {
    cout << "TIDAK" << "\n";
  }
}

int main() {
  FAST;

  int T;
  cin >> T;

  while (T-- > 0) {
    solve();
  }

  return 0;
}
```


