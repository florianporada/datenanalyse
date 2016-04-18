


Aufgabe 4:
    Tabellen:
        Titel
            - PPN
            - Titel
            - Autor
            - ISBN
            - Verlag, Ort
            - Jahr
            - Auflage
            
        Zuordnung
            - Subject (FK)
            - Titel (FK)
            
        Subjects
            - ID
            - Notation (String) Bsp: ST 200 oder Datenbanken
            - Source (String) // Bsp: RVK oder SWD
            
            //RVK: datafield[@tag="936"]/subfield[@code="a"] --> rvk
            //Schlagworte: datafield[@tag="689"]/subfield[@code="a"] -->code="2" muss GND sein
        Exemplar
            - Barcode
            - Titel (FK)
            - Standort (FK)
            - Signatur
            
        Standort
            - Sigel     