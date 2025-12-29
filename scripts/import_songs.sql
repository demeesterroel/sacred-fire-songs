-- Batch Import of ChordPro Songs with Researched Authors


-- Song: Abuelitas piedras
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Abuelitas piedras', 'Traditional (Maria Valdivia)') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 01. Abuelitas piedras}
{ci: Temazcal version}
Abuelitas piedras las gracias te damos, las gracias te damos
Por abrir el corazón a la sanaçion, abrirlo al amor
{ci: Full version}
[Am]Abuelito Fuego las [G]gracias te damos, las [Em]gracias te damos
[Am]Por abrir el corazón a la [G]sanación, abrirlo al [Em]amor
[Am]Madrecita Tierra, las [G]gracias te damos, las [Em]gracias te damos
[Am]Por abrir el corazón a la [G]sanación, abrirlo al [Em]amor
...Madrecita Tierra
...Hermanito Viento
...Padresito Cielo
...Madrecita Agua
...A las Medicinas
...A los abuelitos
...A Ometeotl
');
END $$;

-- Song: Abuelito Fuego
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Abuelito Fuego', 'Traditional (Camino Rojo)') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 02. Abuelito Fuego}
{subtitle: Santiago song}
[C]Abuelito Fuego tu [E7]pluma es bri[Am]llante 
Abuelito Fuego de mi cora[C]zón 
Abuelito Fuego tu [E7]pluma es bri[Am]llante 
Abuelito Fuego de mi cora[C]zón 

[F]Abuelito Fuego tu pluma es brillante 
[C]En el centro y''adentro de mi corazón 
[G]Abuelito Fuego tu pluma es brillante 
[C]Abuelito Fuego de mi corazón 

[G]Awakolla Karaway karaway karaway 
[C]Peyotito Karaway karaway karaway 
Ayawaska Karaway karaway karaway 
Tabaquito Karaway karaway karaway 
');
END $$;

-- Song: Agradecer
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Agradecer', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 03. Agradecer}
Agradecer, agradecer. (2x) 
Esta tierra tan bonita 
Pachamamita Pachamamita (x2) 

Reconocer, reconocer (2x) 
En este altar el poder 
este poder este poder (x2) 
');
END $$;

-- Song: Agua cambia
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Agua cambia', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 04. Agua cambia}
El agua cambia todo lo que toca, 
todo lo que toca cambia (2x) 
Toca, Cambia, todo lo que toca cambia. (2x) 

El Fuego cambia todo lo que toca, 
todo lo que toca cambia (2x) 
Toca, Cambia, todo lo que toca cambia. (2x) 

El viento cambia todo lo que toca, 
todo lo que toca cambia (2x) 
Toca, Cambia, todo lo que toca cambia. (2x) 

La Tierra cambia todo lo que toca, 
todo lo que toca cambia (2x) 
');
END $$;

-- Song: Aho Gran Espíritu
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Aho Gran Espíritu', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 05. Aho Gran Espíritu}
Ahó, Ahó, Ahó Gran Espíritu (2x) 
Del corazón de la montaña 
Hacia el espacio infinito (2x) 

Ahá, Ahá, Ahá Mi madre Tierra (2x) 
Madre de todas las criaturas 
que habitan sobre ella (2x 

Rayo, Rayo, Rayo del nuevo día 
Sono el tambor, danza del Sol 
Mi corazón siente alegría 
');
END $$;

-- Song: Aho Pacha Mama
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Aho Pacha Mama', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 06. Aho Pacha Mama}
Aho Pacha Mama, 
Madre Tierra, Sacred Goddess / Gaia / Goddess / Gaia 
Tonantzin (3x) / Tonantzin, Tonantzin, Tonantzin 

Tezcatlipoca y Quetzalcoatl 
creation of the universe 
in darkness and light 
Tezcatlipoca y Quetzalcoatl 
creation of the universe 
in darkness and light 

Aho Pacha Mama, 
Madre Tierra, 
Sacred Water / Fire / Water / Fire 
Tonantzin / Tonatiuh / Tonantzin / Tonatiuh, tonatiuh, tonatiuh 

Tezcatlipoca y Quetzalcoatl 
creation of the universe 
in darkness and light 
');
END $$;

-- Song: Bendice la Tierra
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Bendice la Tierra', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 07. Bendice la Tierra}
[Am]Bendice la tierra con [Am]agua. 
[G]Bendice la tierra con tu cora[Am]zón 
[Am]Bendice la tierra con [Am]aire 
[G]Y vuela siempre en liber[Am]tad (2x) 

[G]Y ábrete (3x)[Am] 
A la [E7]vida y al a[Am]mor (2x) 

Bendice la tierra con fuego 
Que brille la llama dentro de ti 
Bendice la tierra a su gente 
Trayendo pura sanación (2x) 

Y ábrete (3x) 
A la vida y al amor (2x) 
');
END $$;

-- Song: Blessed we are
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Blessed we are', 'Peia') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 08. Blessed we are}
[Verse 1]
[Am]Blessed we are to [Dm]dance on [G]this ground, 
The [G]rhythm of saints to [C]carry the sound. 
[Dm]We hold a prayer for the [Am]earth, for the ones yet to come, 
[G]''May you walk in beauty and [C]remember your song.'' 

[Verse 2]
[Am]Blessed we are to [Dm]dance on this ground, 
The [G]rhythm of saints to [C]carry the sound. 
[Dm]We hold a prayer for all [Am]life, for the days yet to come, 
[G]''May you walk in beauty and [C]remember your song.'' 

[Bridge]
[Dm]Remember why you came [C]here, 
re[Am]member your life is [G]sacred 
[Dm]Remember why you came [C]here, 
re[Am]member your life is [G]sacred 
Hayahey yahey yahey yoh 

[Chorus] (2x)
[Dm]Hayahey yahey yahey [Am]yoh 
[C]Hayahey yahey yahey [G]yoh 
');
END $$;

-- Song: Brilla Diamante
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Brilla Diamante', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 09. Brilla Diamante}
Dio mio me presento con los manos vacíos 
En mi corazon zon, 
diamante, en tu (su) gracia, 
brilla brilla diamante 

Brilla brilla diamante, brilla brilla diamante 
Brilla brilla diamante, brilla brilla diamante (x2) 
Brilla brilla hasta luz luz 
brillan brillan los colores, 
fluye fluye el amor, 
fluye fluye el amor 

Damderore damderore damderore damderore 
');
END $$;

-- Song: Caboclo
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Caboclo', 'Traditional (Umbanda)') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 10. Caboclo}
[Am]Caboclo nas matas Nas cachoeiras 
Nas pedras e nas pedreiras E nas ondas do mar 

[Am]Cobocla guerreira mensageira 
Da paz e da harmonia soldado de oxala 

[Dm]Vem de aruanda vem vem vem 
[Am]Trazendo forca vem vem vem 
[E]Quebrando mironga vem vem vem 
[Am, A7]Na umbanda sarava 

{c: English Translation:}
{c: Caboclo of the forest, of the waterfalls }
{c: Of the stone and stony places, and the waves of the sea, }
{c: Cabocla (female) warrior, messenger of peace & harmony, }
{c: soldier of Oxala, }
{c: From Aruanda, come, come, come bringing strength, }
{c: to break the illusion, so Umbanda can be healed" }
');
END $$;

-- Song: Calling
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Calling', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 11. Calling}
Calling calling calling us home 
Calling calling calling us home 
Wherever we may roam 

Grandfather Sky 
Grandmother Earth 
Sacred Water 
Our heart 
Grandfather fire 
is calling us home 
');
END $$;

-- Song: Canto enamorado del pájaro
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Canto enamorado del pájaro', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 12. Canto enamorado del pájaro}
Desde lejos... 
desde lejos oigo el canto enamorado 
de un pájaro... 
Y ese pájaro... 
Es mi abuelo 
Es mi abuelo que canta, 
Que canta enamorado. (2x) 

Canta, canta, canta 
Canta, canta, canta 
Canta, canta, canta 
canta, canta, canta 

Ágida a a a a 
Ágida, Ágida, 
Ágida da 
Ágida, Agidaaaa (2x) 

Ágida Ágidada 
Ágidagidaaa (2x) 
Ágida Aj Ágida 
Ágida Aj Ágide 
');
END $$;

-- Song: Colhendo lírio lirulê
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Colhendo lírio lirulê', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 13. Colhendo lírio lirulê}
Eu vi mamãe oxum na cachoeira 
Sentada na beira do rio 

Colhendo lírio lirulê 
Colhendo lírio lirulá 
Colhendo lírio 
Pra enfeitar o seu gongá 
Colhendo lírio lirulê 
Colhendo lírio lirulá 
Colhendo lírio 
Pra enfeitar o seu gongá 

Mamãe Oxum tem proteção de Zambi 
Olhai seus filhos com olhar sereno 
Ela é beleza 
Ela é pureza 
Ela nos traz a paz 
Do Santo Nazareno 
');
END $$;

-- Song: Core core
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Core core', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 14. Core core}
Core core core core core core yanamayey (x2) 
Yana yana yana yanamayey (x4) 
');
END $$;

-- Song: Cuatro Vientos
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Cuatro Vientos', 'Danit') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 15. Cuatro Vientos}
Viento que viene de la montaña 
Viento, tráenos la claridad 
Viento que viene de la montaña 
Viento, tráenos la claridad 

Viento que viene del mar 
[Am]Viento, tráenos la [Em]liber[G]tad 
Viento que viene del mar 
Viento, tráenos la libertad 

Vuela, vuela, vuela, vuela 
Vuela, vuela, vuela, volá con nosotros (2x) 

Viento que viene del desierto 
Viento, tráenos el silencio 
Viento que viene del desierto 
Viento, tráenos el silencio 

Vuela, vuela, vuela, vuela 
Vuela, vuela, vuela, volá con nosotros 

Viento que viene de la selva 
Viento, tráenos la memoria 
Viento (viento) que viene de la selva 
Viento, tráenos la memoria 

Vuela, vuela, vuela, vuela 
Vuela, vuela, vuela, volá con nosotros 

Viento que viene de la selva 
Viento, tráenos la memoria 
Viento que viene de la selva 
Viento, tráenos la memoria 

Vuela, vuela, vuela, vuela 
Vuela, vuela, vuela, volá con nosotros 
');
END $$;

-- Song: Down to the river
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Down to the river', 'Traditional (Spiritual)') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 16. Down to the river}
[G]As I went down to the river to pray 
[D]Studying about that good old [G]way 
And who shall *wear the starry crown 
[D]Good Lord [C]show me the [G]way 

Oh [D]*Sisters, let''s go [G]down 
[C]Let''s go down, come on [G]down 
Oh sisters, let''s go [D]down 
[C]Down in the river to [G]pray 

{c: (*) Variations for ''wear the starry crown'': wear the robe and crown }
{c: (*) Variations for ''Sisters'': Oh Brothers }
');
END $$;

-- Song: Earth Water Blood
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Earth Water Blood', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 17. Earth Water Blood}
Earth my body water my blood 
Air my breath and fire my spirit 

Tierra mi cuerpo agua mi sangre 
Aire mi aliento y fuego mi espíritu 
');
END $$;

-- Song: Espíritu del agua
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Espíritu del agua', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 18. Espíritu del agua}
Hermoso espíritu del agua, 
llega ya 
Curando purificando, llega ya 

El gran cóndor de los andes, 
vuela ya 

En el corazón de mis hermanos, 
llega ya 
Curando iluminando, llega ya 
Curando purificando, llega ya 

Cuatro vientos en el centro, 
soplan ya 

Siete flechas en el centro, 
brillan ya 

Hermoso espíritu del cielo, 
llega ya 
Curando illuminando, llega ya 

En el corazón de este fuego, 
vuela ya 

La gran águila del norte, 
vuela ya 

Hermoso espíritu de ayahuasca, 
llega ya 
');
END $$;

-- Song: Eu sou Santa Maria
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Eu sou Santa Maria', 'Traditional (Santo Daime)') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 19. Eu sou Santa Maria}
Eu sou Santa Maria 
Trago aqui Amor e Alegria (2x) 

E aqui dentro deste salão 
A alegria é a nossa única razão 
Santa Maria Nina Urku 
');
END $$;

-- Song: Florecerá
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Florecerá', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 20. Florecerá}
Voy sembrando una semilla de paz 
en la tierra y en el corazón (paz, luz, amor) 

Llamo al agua 
canto al agua 
para que venga a darle vida 

Padre Sol le dará la fuerza 
y el silencio será su melodía 

Florecerá, florecerá 
florecerá, florecerá 

Floreciendo la conciencia 
florece mi corazón 
');
END $$;

-- Song: Fly - little bird
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Fly - little bird', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 21. Fly - little bird}
[d]I just need your little [a]smile 
[a]I just need your [d]smile 
[d]Sing for me, my little [a]bird 
[a]Sing your song for [d]me 

To [C]fly, To [G]fly 
To fly behind the sky (4x) 

[d]Sing for me, my little [a]bird 
[a]In your arms I feel [d]divine 
Take me to your world 
[a]To your sun, To your [d]moon 

[C]And/Your stars behind the [G]sky (2x) [d] 

[a]In your eyes I see the [d]light 
[a]In your eyes I see (the [d]light)
[a]Of the sun, of the [d]moon 
[C]The stars behind the [G]sky (2x) 

[d]Love leads to eter[a]nity 
[a]Your heart will show the [d]way 
[d]Love leads to eter[a]nity 
[a]Your heart will show the [d]way 
[a]To your sun, To your [d]moon 
[C]Your stars behind the [G]sky (2x) 
');
END $$;

-- Song: Gitsi Gitsi Manitou
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Gitsi Gitsi Manitou', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 22. Gitsi Gitsi Manitou}
Gitsi, gitsi, gitsi Manitou (x2) 
Gitsi Manitou, gitsi Manitou (x2) 

Yoha, yoha, yoha wanna-yo (x2) 
Yoha wanna-yo, yoha wanna-yo (x2) 

Quetzalcoatl, take us by the hand 
we will follow the morning star 
Yoha wanna-yo, yoha wanna-yo (x2) 

With this star we shall rise 
with happiness and beauty in our lives 
Yoha wanna-yo, yoha wanna-yo (x2) 
');
END $$;

-- Song: Hey yamayo
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Hey yamayo', 'Curawaka') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 23. Hey yamayo}
{artist: Curawaka} 
He yama yo 
Wana hene yo 
He yama yo 
Wana hene yo 
Wahee 
Yayana 
Hey hey hey ho 
Waahee 
Hey hey hey hey hey ho 
Wahee 
');
END $$;

-- Song: Ide were were
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Ide were were', 'Traditional (Yoruba)') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 24. Ide were were}
[e]Ide were were nita [D]Oxun. 
[E]Ide were were. 
[e]Ide were were nita [D]Oxun. 
[e]Ide were were nita ya. 

[e]Ocha kiniba nita [C]Oxun [D] 
Cheke cheke cheke. [G]nita [C]ya. [D] 
Ide were were. [b] [B7] 
');
END $$;

-- Song: Inan Tonanzin
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Inan Tonanzin', 'Traditional (Nahuatl)') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 25. Inan Tonanzin}
Inan tonanzin tlan 
inan tonanzin tlali 
Inan tonanzin 
inan tonanzin tlan (x2) 

Welo we ya ya yo welo we ya yo (x2) 
Heya Heya Heya Heya Heya 
Heya Heya Heya welo we ya yo (x2) 
');
END $$;

-- Song: L'albero
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('L''albero', 'Dario Hampi Pakari') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 26. L''albero}
{capo: 5} 
La radice è forte l''albero cresce il ramo si allungherà (a Cea) 
E da quel ramo la foglia che cresce nel sole risplenderà (a Cea) 
Quando è il momento danzando nel vento la terra bacerà (FCEa) 
Ed al mattino là sulla cima si sentirà il cantare (a Ce a) 
Di chi al risveglio ringrazia il vento che gli insegnò a volare (FCEa) 
Di chi al risveglio canta contento ed inizia a volare (FCEa) 

La radice è forte l''albero cresce il ramo si allungherà 
E da quel ramo la foglia che cresce nel sole risplenderà 
Dalla radice la forza creatrice nel Tronco si innalzerà 
Chiamata dal sole e dal suo calore nell''acqua inizia a viaggiare 
Portando il messaggio pieno di coraggio che l''amore sboccerà 
E con il valore che dà l''amore il seme germoglierà 
{c: Dario} 
');
END $$;

-- Song: Luz divina
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Luz divina', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 27. Luz divina}
Luz divina Santa María 
Santa María divino amor (2x) 
Agua limpia y milagrosa 
Que da todo su esplendor (2x) 

Luz divina Santa María 
Santa María divino amor (2x) 
Virgen madre que me guía 
/ a mi es ella quien me guia, 
En esta planta que es todo amor (2x) 
');
END $$;

-- Song: Medicina Lapitoj
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Medicina Lapitoj', 'Coral Herencia') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 28. Medicina Lapitoj}
Te lleva adentro 
al centro de tu centro 
medicina lapitoj 
toco tu corazón (2x) 

Tiene colmillos de Jaguar 
mirada profunda como la serpiente 
alas de cóndor para volar 
espirales salen desde su frente 

Cura, sana, siente, ama (2x) 
Cura por dentro 
sonrie contento 
Espiritu Antiguo 
puente vivo cosmico (2x) 

Tiene colmillos de Jaguar 
');
END $$;

-- Song: Mother I Feel You
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Mother I Feel You', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 29. Mother I Feel You}
Mother I feel you under my feet. 
Mother I can feel your heart beat (2x) 
Hey ya (7x) ho [G] 

Sister I can hear you in the river''s song. 
Eternal waters flowing on and on (2x) 
Hey ya (7x) ho 

Father I can see you in the eagles flight. 
Light of the Spirit''s gonna take us higher (2x) 
Hey ya (7x) ho 

Brother I can see you in the fire flame 
Dancing and drumming''s gonna make us stronger (2x) 
Hey ya (7x) ho 
');
END $$;

-- Song: Mother I Honor You
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Mother I Honor You', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 30. Mother I Honor You}
Grand Mother I honor you 
[a]Your water is my [G]blood 
Every day and every night 
I give thanks for your love 

Grandfather I honor you 
You spirit is my guide 
Every day and every night 
I give thanks for your love

Awe awe awe awa... 
');
END $$;

-- Song: Pachamama
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Pachamama', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 31. Pachamama}
Pachamama madre tierra (x2) 
Taita inti taita inti taita inti 
Gran Espiritu 

Pachamama madre tierra (x2) 
Wirikuta wirikuta wirikuta 
Gran Espiritu 

Pachamama madre tierra (x2) 
Nina Urku Nina Urku Nina Urku 
Gran Espiritu 
');
END $$;

-- Song: Queen of the web
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Queen of the web', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 32. Queen of the web}
Momma iktomi (hitomi) queen of the web 
weaving us all with her sacred thread (x2) 

wiki tiki tiki tiki 
wiki tiki tiki tiki 
Queen of the web (x2) 

weaving the heavens into the earth, 
weaving our dying into our birth (x2) 

wiki tiki tiki tiki 
Queen of the web (x2) 

nothing escapes her tender embrace, 
dark, light, wrong, right Queen of the web (x2) 

wiki tiki tiki tiki 
Queen of the web (x2) 
');
END $$;

-- Song: Salve salve mama Oxun
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Salve salve mama Oxun', 'Traditional (Umbanda)') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 33. Salve salve mama Oxun}
Salve salve mamae Oxum 
Com sua luz vem-nos iluminar (x2) 
Salve salve mamae (x2) 
Salve salve mamae Oxum (x2) 

Com suas aguas vem-nos curar (x2) 
Salve salve mamae (X2) 
Salve salve mamae Oxum (x2) 

Com sue sorriso vem-nos alegrar (x2) 
Salve salve mamae (x2) 
');
END $$;

-- Song: Salve Rainha do Mar
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Salve Rainha do Mar', 'João de Angola') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 34. Salve Rainha do Mar}
[C]Sal ve Ra hi [G]na Do [C]Mar 
[G]Salve Rahina do Mar 
[Dm]Salve minha mae [G]Iemanja 
[C]Ella é [Dm]criadora 
Du [G]fundu du [C]mar (x2) 

[C]Ella é pro[Dm]tectora 
Du [G]fundu du [C]mar (x2) 

[C]Ella é minha [Dm]Mae 
[G]Ella é Ie[C]manja (x2) 
');
END $$;

-- Song: Siento la medica
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Siento la medica', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 35. Siento la medica}
{capo: 2} 
{c: TRAI NAI NAI NAI NAI NAI NAI NAI NAI NAI NAI NAI }

[Verse 1] 
[Am]Siento la medi[G]cina 
[Am]Viene Cu[G]rando 
[Am]Viene Sa[G]bando 
[Am]Viene Ali[G]viando 

[Verse 2] 
[Am]Siento el calor del [G]sol 
[Am]Fluyendo en mi cora[G]zón 
[Am]Viajando en el uni[G]verso 
[Am]Libre volando hacia la [G]Luz que da la [Am]vida 
[G]En este para[Am]iso 
[G]De color y ale[Am]gria 
[G]Canta melodia / [Am]medicina 
{c: inai nai nai nai... }

[Refrain] 
[Dm]Madre Ayahuasca / Abuelo San [Am]Pedro calma mi [C]mente [G] 
[Dm]Luz divina guia mi cora[Am]zon [C] [G] 
[Dm]Madre Ayahuasca / Abuelo San [Am]Pedro danos cons[C]ciencia [G] 
[Dm]Luz divina guia mi cora[Am]zon [C] [G] 
');
END $$;

-- Song: Sou Filho de Deus
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Sou Filho de Deus', 'Traditional (Santo Daime)') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 36. Sou Filho de Deus}
Sou filho de Deus, sou filho da Rainha 
São Pedro è o Mestre quem me ensina nesta linha (x2) 
{c: I am a child of God, I am a child of the Queen }
{c: Saint Peter is the Master who teaches me this line (x2) }

Santa Maria vem-nos ajudar 
Todos seus filhos quem confiam procurar (x2) 
{c: Saint Mary comes to help us }
{c: All her children whom you trust to seek (x2) }

Procura procura, quem procura acha 
Santa Maria com amor de Deus despacha (x2) 
{c: Seeker seeks, does who seek will find }
{c: Saint Mary, with God''s love, get rid of (x2) }

Despacha tudo quanto for ruim 
deixando tudo com perfume de Jasmim (x2) 
{c: Get rid of all that is bad, leaving everything with the scent of Jasmine (x2) }

Sou filha de Deus, sou filho da Rainha 
Awakallero è o Mestre quem me ensina nesta linha (x2) 
');
END $$;

-- Song: Tamborcito
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Tamborcito', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 37. Tamborcito}
Tamborcito tamborcito 
ayúdame a cantar (x2) 

{subtitle: Alternative version} 
Tabachito tabachito 
Ayudame a rezar (X2) 

Para que salga la voz 
Para que salga la voz 
Para que salga la voz 
Y (que) llegue a donde tenga que llegar 

Al corazón de mi hermano 
Al corazón de mi hermana 
Al corazón de la tierra 
de este fuego, 
de este agua, 
del viente 

Al corazón al corazón 

{c: Translation:} 
{c: Tamborcito tamborcito }
{c: help me to sing (x2) }
{c: For the voice to come out }
{c: To bring out the voice }
{c: So that the voice comes out }
{c: And let it go where it needs to go }
{c: To my brother''s heart }
{c: To my sister''s heart }
{c: To the heart of the earth }
{c: of this fire, }
{c: of this water, }
{c: of the wind }
{c: To the heart of the heart }
');
END $$;

-- Song: Tonantzin tzin tzin
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Tonantzin tzin tzin', 'Traditional (Nahuatl)') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 38. Tonantzin tzin tzin}
Tonantzin tzin tzin tonantzin (x2) 
Tona tona tona tonantzin $(\times2)$ 
Tonatiuh tiuh tiuh tonatiuh $(\times2)$ 
Tona tona tona tonatiuh $(\times2)$ 
');
END $$;

-- Song: Ven, ven
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Ven, ven', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 39. Ven, ven}
Ven, ven.. ven, ven. 
ven, ven. ven, ven. ven, ven... 

Agua de la vida, 
agua pura, cura agua, ven, ven (x2) 

Ven ven, agua cura 
Ven, ven, agua pura, 
Ven ven, agua cura 
Ven, ven(x2) 

Sangre de mi Madre, 
sudor de mi Padre (x2) 

Ven ven, agua cura (x2) 

Barcos hechos de lágrimas, 
Tenemos un barco para ti (x2) 
Ven ven, agua cura... (x2) 

Remos hechos de cantos 
Deliciosos y antiguos para ti (x2) 
Ven ven, agua cura... (x2) 
');
END $$;

-- Song: Vuela
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Vuela', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 40. Vuela}
Vuela, vuela, vuela, vuela 
Vuela y se feliz 
Vuela, vuela, vuela, vuela 
Vuela dentro de ti 

Dentro de ti, dentro de ti 
Está este cielo 
Dentro de ti, dentro de ti 
Arde este fuego 

Dentro de ti, 
La medicina 
Está danzando 

Dentro de ti, 
Dentro de ti, algo 
Está cambiando 
');
END $$;

-- Song: Weyo wey yanna
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Weyo wey yanna', 'Traditional') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 41. Weyo wey yanna}
Weyo wey yanna weyo wey yanna (x4) 

En el desierto weyo wey yana Huicholes danzan weyo wey yana 
Con abuelito weyo wey yanaEl peyotito weyo wey yana 

Y en la selva weyo wey yana Jaguares saltan weyo wey yana 
La boa boila weyo wey yana Con ayahuasca weyo wey yana 

Y en los Andes weyo wey yana Alli florece weyo wey yana 
La Huachuma weyo wey yana El Awacolla weyo wey yana 

Y en el cero weyo wey yana Canta la tierra weyo wey yana 
Con los honguitos weyo wey yana Los Ninos Santos weyo wey yana 

Weyo wey yanna weyo wey yanna (x3) 
Weyo wey yana Hey ney oh wey 
');
END $$;

-- Song: Wichita tuya
DO $$
DECLARE
    comp_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('Wichita tuya', 'Traditional (Lakota)') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '{title: 42. Wichita tuya}
danklied en waterlied 
Wishi Ta Duja Duja Duja 
Washan Te Neya Heya Heya 
');
END $$;

