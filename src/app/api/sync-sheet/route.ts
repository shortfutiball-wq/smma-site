import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { itemNumber, revisions, sheetId } = await req.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: "sync-350@jaywon.iam.gserviceaccount.com",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvAmssbVNL6nLu\n2subgeFlhH0D9xDRpRZUPN/0ZezWh+H/pEHjVUUFQqQqIQ/XVoOOYbpvH+TKPPef\nYwhwK/D9kn7OTWQHBLx5noMLql4QU1QloR1hRVXfTpOPx9frc/y0xFYw8+DfGDD8\nl4675mdygeSdDGxKCk7MZhJeh+TfjF9SoBQXszrMRy8rzQKYCbNv4E6QVqTqhFYX\n0sPrpfAmXuZ63uRkJxN/frpKdCICmyCC+rVRADTubU6d9JV/27XZHPnOBxuSoYlM\nPSz24xqVwbLmxDwoAMTMorPwma2WcNh9gLywGdbditGOSjMaOfEYfMPO0aCpHucz\nxx1JfAmnAgMBAAECggEADZ4fD8Rr/FbAXbSZrj6Ddt5Bygqx/NYfMCvSc1ZxANpu\n6/DwjYtnhPrEAmEzNdrN/si89IOjTldDH1xZ3jyVEm4RPuVHuMIWFlKOuNwnWJbb\nT9hDDHwUK/2VvtTaiMAsNDaozENVxpY/zY/Pc/CAMSlJTC0YygQWUJJKsJ9bYEeP\ncDTPO0zJKa85upRG0FoVApLhygsjkO3wWMUdDlSTRoVor1Oa/LFLHV6/YiFWvJi8\nu9q+5UWsPAJMnYU2+Odukh9CQeHqP9pnIZj6r0TpuavWdlafAdkL+T/aRT+D3BGc\nhbSpQ4GHiwZVp8JC7Jee06/+Id11VAQ+FeeXB0YNcQKBgQDfa//k3r3dxEaO4sgq\nuYa316afEbzSsW6aFcwR5FIb01F9UKa8UaMhjMzhXTi6fL4QFL32B7z9N3l79fXn\nCPdJnjftgLP2OWiMsWbi6zF6Ya7tx6Pwlx77ytZGf48JsTN72zKJPf/YeFKqHxuj\n9jXtcTxrUNVTekGtbLRFX9ewMQKBgQDIh0GouoBSVwZAwzU3nwM6adHm3rbbYZjL\nnCUtGWSqoK3RWGPD9OH7M6/TnIxCgL6M7KtnG3Nimi+BcKgipg+Yzksc3H1Ic16j\nZctOYCbyIJErX0diaLGAM2F5KI/ks2Q86okWmMqy4+7NJKM3okWmMqy4+7NJKM3\nkofr5I5Ksam2DeDpDAp9AWh5VwKBgQDdpi5K53NjZEo/jNraEA6HqmjB3H4AZEh+\nkutOQL34nu90LCQOJct6CE5lse8Ki6CfIYTHZSvn5jYedYfL+cgif9WqSInA13lS\nQtj4fC4s5GX/vZR1peb2E2f6rqfADM0vrel34EtGfTA9V/k685LSiglPyfSpCVvI\n6lP5kzjOsQKBgA4bBZFa3R/tozD3Ck1JUC7RtsQosnAoI1lfOHY9rQkbmF57ezkT\nhrnm3t1hy7P53m2HUF9GXQ14jxLp28nkKIC1Mi9rixyHkQapaG2w8cxiYhPM9faE\nKsg71QVyxvxtagWm8dG3GbsPsYKYqyqDkjATubajXK7Dtyhtgmdcq/6tAoGAbBfQ\n+kqdxrwDreQdsgl/6czSE3tLNKrBHXbguFTKZgsq3uFuszzysf/uQPanb0gVOF5/\nFAJn9ZE58GgO2RPxtrxfh42pilupVxmWe8R61VJ79roQyAyVGNTKAU9taoVCt/2x\nd8uxCCs/RuqCV3b+mq983fenAM5/b3Lp/Hr+AOo=\n-----END PRIVATE KEY-----\n",
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 1. Récupérer les infos sur le document (pour avoir le nom de l'onglet)
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
    const sheetName = spreadsheet.data.sheets?.[0].properties?.title || 'Sheet1';

    // 2. Récupérer toute la colonne A
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${sheetName}!A:A`, 
    });

    const rows = response.data.values || [];
    let rowIndex = -1;
    const searchId = itemNumber.toString().trim();

    // Recherche intelligente : regarde si le numéro est contenu dans la cellule
    for (let i = 0; i < rows.length; i++) {
      const cellValue = rows[i][0]?.toString().trim();
      if (cellValue === searchId || cellValue?.includes(` ${searchId}`) || cellValue?.includes(`${searchId} `)) {
        rowIndex = i + 1;
        break;
      }
    }

    if (rowIndex === -1) {
      return NextResponse.json({ error: `Item n°${itemNumber} non trouvé dans la colonne A.` }, { status: 404 });
    }

    // 3. Préparer les dates formatées
    const valuesToUpdate = revisions.map((rev: any) => {
      const date = new Date(rev.date);
      return date.toLocaleDateString('fr-FR');
    });

    // 4. Mise à jour
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${sheetName}!B${rowIndex}:Z${rowIndex}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [valuesToUpdate],
      },
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
