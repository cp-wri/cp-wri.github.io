import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Karakter {
  public static void main(String[] args) {
    FastReader sc = new FastReader();

    int n = sc.nextInt();
    char[] a = sc.next().toCharArray();
    char[] b = sc.next().toCharArray();

    int start, end;
    int result = 0;
    int lastStart = 0;

    do {
      start = -1;
      end = -1;

      for (int i = lastStart; i < n; i++) {
        if (b[i] < a[i]) {
          if (start == -1) {
            start = i;
          }
          continue;
        }

        if (b[i] > a[i] && start != -1) {
          end = i;
          break;
        }
      }

      for (int i = start; i < end; i++) {
        a[i] ^= b[i];
        b[i] ^= a[i];
        a[i] ^= b[i];
      }

      if(start == -1) break;

      lastStart = end - 1;
      result++;
    } while (start != -1 && end != -1);

    System.out.println(result);
  }
}

class FastReader {
  BufferedReader br;
  StringTokenizer st;

  public FastReader() {
    br = new BufferedReader(new InputStreamReader(System.in));
  }

  String next() {
    while (st == null || !st.hasMoreElements()) {
      try {
        st = new StringTokenizer(br.readLine());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    return st.nextToken();
  }

  int nextInt() {
    return Integer.parseInt(next());
  }

  long nextLong() {
    return Long.parseLong(next());
  }

  double nextDouble() {
    return Double.parseDouble(next());
  }

  String nextLine() {
    String str = "";
    try {
      if (st.hasMoreTokens()) {
        str = st.nextToken("\n");
      } else {
        str = br.readLine();
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
    return str;
  }
}