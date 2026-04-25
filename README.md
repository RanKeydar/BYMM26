# malamala | מעלהמעלה

אפליקציית Streamlit פשוטה בעברית וב־RTL לסימולציה של 7 מחזורי הפלייאוף העליון, עם דגש על בדיקת תרחישי עליית ליגה של בני יהודה דרך המקום השני.

## עדכון תוצאות אמת

תוצאות של משחקים שכבר הסתיימו נשמרות בקובץ `completed_results.json`.

פורמט לדוגמה:

```json
{
  "r1_m1": { "home_goals": 2, "away_goals": 1 },
  "r1_m2": { "home_goals": 0, "away_goals": 0 }
}
```

כאשר משחק מופיע בקובץ הזה:
- הוא נטען אוטומטית עם התוצאה שנקבעה
- אי אפשר לערוך אותו מתוך ה־UI
- הוא לא מתאפס דרך כפתורי האיפוס

## מה יש באפליקציה

- טבלה התחלתית לפני מחזור 1
- לוח משחקים למחזורי 1–7
- תרחישים מוכנים מראש
- הזנה ידנית של תוצאות לכל משחק
- טבלה מתעדכנת אחרי כל מחזור
- טבלה סופית עם דירוג לפי:
  - נקודות
  - הפרש שערים
  - שערי זכות
- הדגשה של בני יהודה
- חיווי ברור אם בני יהודה סיימה בטופ 2

## הרצה מקומית

```bash
pip install -r requirements.txt
streamlit run app.py
```

אפשר גם עם הפקודות שביקשת:

```bash
pip install streamlit pandas
streamlit run app.py
```

## פריסה ל-Render

הפרויקט כולל `render.yaml` מוכן.

אם פורסים ידנית ב־Render:

- Build Command: `pip install -r requirements.txt`
- Start Command: `streamlit run app.py --server.port $PORT --server.address 0.0.0.0`

## Git

לאתחול מקומי:

```bash
git init
git add .
git commit -m "Initial BY26 Streamlit app"
```
