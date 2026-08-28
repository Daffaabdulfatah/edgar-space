--
-- PostgreSQL database dump
--

\restrict vj6HqF7ojlQ3WT22OzIwoEgmR51RLijabTu7qabPX42idWLhhYdTogeQF4O66jJ

-- Dumped from database version 16.14 (Homebrew)
-- Dumped by pg_dump version 16.14 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: StockMovementType; Type: TYPE; Schema: public; Owner: 4ntith3sis
--

CREATE TYPE public."StockMovementType" AS ENUM (
    'RESTOCK',
    'ADJUSTMENT',
    'REDUCTION'
);


ALTER TYPE public."StockMovementType" OWNER TO "4ntith3sis";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: 4ntith3sis
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO "4ntith3sis";

--
-- Name: admins; Type: TABLE; Schema: public; Owner: 4ntith3sis
--

CREATE TABLE public.admins (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.admins OWNER TO "4ntith3sis";

--
-- Name: admins_id_seq; Type: SEQUENCE; Schema: public; Owner: 4ntith3sis
--

CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admins_id_seq OWNER TO "4ntith3sis";

--
-- Name: admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: 4ntith3sis
--

ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: 4ntith3sis
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    thumbnail text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.categories OWNER TO "4ntith3sis";

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: 4ntith3sis
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO "4ntith3sis";

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: 4ntith3sis
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: 4ntith3sis
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    price numeric(12,2) NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    thumbnail text,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "categoryId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    images text[] DEFAULT ARRAY[]::text[]
);


ALTER TABLE public.products OWNER TO "4ntith3sis";

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: 4ntith3sis
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO "4ntith3sis";

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: 4ntith3sis
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: stock_movements; Type: TABLE; Schema: public; Owner: 4ntith3sis
--

CREATE TABLE public.stock_movements (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    type public."StockMovementType" NOT NULL,
    quantity integer NOT NULL,
    "previousStock" integer NOT NULL,
    "newStock" integer NOT NULL,
    note text,
    "adminId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.stock_movements OWNER TO "4ntith3sis";

--
-- Name: stock_movements_id_seq; Type: SEQUENCE; Schema: public; Owner: 4ntith3sis
--

CREATE SEQUENCE public.stock_movements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stock_movements_id_seq OWNER TO "4ntith3sis";

--
-- Name: stock_movements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: 4ntith3sis
--

ALTER SEQUENCE public.stock_movements_id_seq OWNED BY public.stock_movements.id;


--
-- Name: store_settings; Type: TABLE; Schema: public; Owner: 4ntith3sis
--

CREATE TABLE public.store_settings (
    id integer DEFAULT 1 NOT NULL,
    "storeName" text DEFAULT 'Edgar Space'::text NOT NULL,
    "whatsappNumber" text DEFAULT '6281234567890'::text NOT NULL,
    email text DEFAULT 'hello@edgarspace.com'::text NOT NULL,
    address text DEFAULT 'Bandung, Jawa Barat, Indonesia'::text NOT NULL,
    description text DEFAULT 'Showroom furnitur dan dekorasi rumah bergaya hangat, natural, dan modern.'::text,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.store_settings OWNER TO "4ntith3sis";

--
-- Name: admins id; Type: DEFAULT; Schema: public; Owner: 4ntith3sis
--

ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: 4ntith3sis
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: 4ntith3sis
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: stock_movements id; Type: DEFAULT; Schema: public; Owner: 4ntith3sis
--

ALTER TABLE ONLY public.stock_movements ALTER COLUMN id SET DEFAULT nextval('public.stock_movements_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: 4ntith3sis
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
7588d84f-416d-4e3d-9280-bcd7aa6a8ffe	80290d3e604804a105052c5a0c18bcce03bb618c117223274e8fadae468b44f3	2026-08-15 13:52:20.943559+07	20260815065220_init_phase2	\N	\N	2026-08-15 13:52:20.925734+07	1
88b646eb-410c-4dea-8463-2ae4a15aad49	15f451f213fb07c3923a0c8b0f56f373a86df10d3e742fd86e723da26ce970f6	2026-08-16 07:13:43.872284+07	20260816001343_phase3_catalog_indexes	\N	\N	2026-08-16 07:13:43.864449+07	1
\.


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: 4ntith3sis
--

COPY public.admins (id, name, email, "passwordHash", "createdAt", "updatedAt") FROM stdin;
1	Admin Edgar Space	admin@edgarspace.id	$2b$10$27.xfTc9c0b9uZdj.qIpJeZpqU1z76jFUw79jh3hy2nDhwJawblxq	2026-08-15 06:52:33.508	2026-08-25 23:50:25.246
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: 4ntith3sis
--

COPY public.categories (id, name, slug, description, thumbnail, "createdAt", "updatedAt") FROM stdin;
21	Sanitasi & Perlengkapan	sanitasi-perlengkapan	Wastafel keramik halus meja dan toilet duduk monoblok berkualitas.	https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80	2026-08-25 23:50:25.294	2026-08-25 23:50:25.294
15	Kebutuhan Kamar Mandi	kebutuhan-kamar-mandi	Perlengkapan tempat sabun, botol pump, dan dispenser sikat untuk kamar mandi rapi dan estetis.	/uploads/categories/unnamed-1787793984490-572607714.jpg	2026-08-25 23:50:25.272	2026-08-27 01:26:24.494
16	Organisasi Rumah	organisasi-rumah	Aksesori gantungan tempel, keranjang penyimpan, dan pengorganisir barang hunian.	/uploads/categories/chatgpt-image-27-agu-2026-08-3-1787794256782-505589387.png	2026-08-25 23:50:25.278	2026-08-27 01:30:56.79
17	Pintu & Perlengkapan	pintu-perlengkapan	Pengganjal pintu silikon, door stop magnetik, dan perlengkapan pengaman pintu.	/uploads/categories/327544381-526737625953579-8944-1787794294310-863319963.jpg	2026-08-25 23:50:25.283	2026-08-27 01:31:34.313
18	Lampu & Pencahayaan	lampu-pencahayaan	Lampu meja nordik, lampu hias minimalis, dan LED strip pencahayaan aksen.	/uploads/categories/5-7-1787794301062-308603346.jpg	2026-08-25 23:50:25.288	2026-08-27 01:31:41.065
19	Dekorasi Rumah	dekorasi-rumah	Vas keramik minimalis, reed diffuser aromaterapi, cermin LED, dan bantal sofa estetik.	/uploads/categories/dekorasi-rumah-minimalis-minim-1787794353179-619761495.webp	2026-08-25 23:50:25.291	2026-08-27 01:32:33.184
20	Dapur & Ruang Makan	dapur-ruang-makan	Perlengkapan Dapur & Ruang Makan	/uploads/categories/gaya-japandi-untuk-ruang-makan-1787794433214-910155449.jpg	2026-08-25 23:50:25.292	2026-08-27 01:43:07.925
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: 4ntith3sis
--

COPY public.products (id, name, slug, description, price, stock, thumbnail, "isFeatured", "categoryId", "createdAt", "updatedAt", images) FROM stdin;
21	Reed Diffuser Set	reed-diffuser-set	Pewangi ruangan aromaterapi esensial alami dengan stik rotan pilihan untuk menyebarkan keharuman menenangkan di seluruh ruangan.	149000.00	25	/uploads/products/id-11134207-81ztm-me6zff2zjoxy-1787792477749-70125119.jpeg	t	19	2026-08-25 23:50:25.332	2026-08-27 01:01:17.757	{/uploads/products/id-11134207-81ztm-me6zff2zjoxy-1787792477749-70125119.jpeg}
23	Pot Tanaman Minimalis	pot-tanaman-minimalis	Pot tanaman hias meja indoor dari tanah liat stoneware berkualitas tinggi untuk memberikan nuansa segar tanaman hijau.	110000.00	14	/uploads/products/images-1787792442099-919009476.jpeg	t	19	2026-08-25 23:50:25.353	2026-08-27 01:00:42.105	{/uploads/products/images-1787792442099-919009476.jpeg}
20	Lampu Meja	lampu-meja	Lampu baca meja bergaya Nordik skandinavia dengan bahan kayu alami dan kap lampu linen yang memancarkan hangat kecokelatan.	299000.00	12	/uploads/products/10572108-4-1787792607910-179166746.webp	t	18	2026-08-25 23:50:25.326	2026-08-27 01:03:27.92	{/uploads/products/10572108-4-1787792607910-179166746.webp}
19	Keranjang Penyimpanan	keranjang-penyimpanan	Keranjang anyaman serat alami multifungsi untuk mengorganisir pakaian, handuk, atau aksen interior ruangan hangat.	175000.00	15	/uploads/products/10549523-1-1787792656619-171237944.webp	t	16	2026-08-25 23:50:25.317	2026-08-27 01:04:16.623	{/uploads/products/10549523-1-1787792656619-171237944.webp}
16	Gantungan Serbaguna Tempel	gantungan-serbaguna-tempel	Set gantungan stainless multifungsi untuk dapur dan kamar mandi.	32000.00	22	/uploads/products/sg-11134201-7rd6a-m6oy2tmog61e-1787792765332-728289220.webp	f	16	2026-08-15 06:52:33.552	2026-08-27 01:06:05.337	{/uploads/products/sg-11134201-7rd6a-m6oy2tmog61e-1787792765332-728289220.webp}
2	Door Stop Magnet	door-stop-magnet	Pengganjal pintu bermagnet presisi tinggi berbahan stainless steel tahan karat.	35000.00	18	/uploads/products/taffhome-penahan-pintu-anti-co-1787792941712-11758068.jpg	f	17	2026-08-15 06:52:33.53	2026-08-27 01:09:01.72	{/uploads/products/taffhome-penahan-pintu-anti-co-1787792941712-11758068.jpg}
12	Bantal Bunga	bantal-bunga	Bantal sofa berbentuk kelopak bunga berbahan kain velour empuk.	85000.00	14	/uploads/products/d22d701b-7d08-4bad-9fa1-6065c3-1787792997431-512455600.webp	f	19	2026-08-15 06:52:33.546	2026-08-27 01:09:57.479	{/uploads/products/d22d701b-7d08-4bad-9fa1-6065c3-1787792997431-512455600.webp}
11	Toilet Monoblok	toilet	Toilet duduk monoblok sistem dual flush hemat air dan desain modern.	1250000.00	3	/uploads/products/chatgpt-image-27-agu-2026-08-1-1787793236026-622727637.png	f	21	2026-08-15 06:52:33.544	2026-08-27 01:13:56.045	{/uploads/products/chatgpt-image-27-agu-2026-08-1-1787793236026-622727637.png}
24	Meja & Kursi 1 set	meja-kursi-1-set	Meja makan cantik minimalis ala Livien dengan pilihan warna natural yang cantik. Desain yang modern membuat ruangan menjadi kekinian dan tidak membosankan. Tersedia banyak pilihan tipe set untuk mempermudah dalam menyesuaikan luas ruangan kamu dirumah.	5000000.00	3	/uploads/products/8485d5271f3c941b8ac2c746232efb-1787794849138-382101764.jpg	f	20	2026-08-27 01:40:49.167	2026-08-27 01:40:49.167	{/uploads/products/8485d5271f3c941b8ac2c746232efb-1787794849138-382101764.jpg}
4	Toothbrush Holder	toothbrush-holder	Wadah sikat gigi berbahan keramik halus dengan ventilasi udara bawah.	39000.00	20	/uploads/products/e40087s-1787793552646-156793216.webp	f	15	2026-08-15 06:52:33.533	2026-08-27 01:19:12.652	{/uploads/products/e40087s-1787793552646-156793216.webp}
3	Botol Pump Kamar Mandi	botol-pump-kamar-mandi	Botol sabun dan sampo minimalis dengan head pump halus bertema skandinavia.	45000.00	12	/uploads/products/10562287-1-1787793602277-595965049.webp	f	15	2026-08-15 06:52:33.531	2026-08-27 01:20:02.282	{/uploads/products/10562287-1-1787793602277-595965049.webp}
10	Wastafel Minimalis	wastafel	Wastafel keramik meja berbentuk oval dengan kontur permukaan yang halus.	650000.00	4	/uploads/products/classica-italiano-art-basin-cl-1787793674749-356396857.webp	f	21	2026-08-15 06:52:33.542	2026-08-27 01:21:14.753	{/uploads/products/classica-italiano-art-basin-cl-1787793674749-356396857.webp}
22	Tempat Sabun & Sikat	tempat-sabun-sikat	Set aksesoris perlengkapan kamar mandi berbahan keramik halus elegan yang menjaga kebersihan sikat dan sabun mandi.	89000.00	18	/uploads/products/id-11134207-7rasc-m3kgd5q78zbu-1787792025308-238376389.webp	t	15	2026-08-25 23:50:25.346	2026-08-27 01:25:02.929	{/uploads/products/id-11134207-7rasc-m3kgd5q78zbu-1787792025308-238376389.webp}
5	Cermin LED Touchscreen	cermin-led-touchscreen	Cermin rias dinding dengan pencahayaan LED adjustable dan tombol sentuh.	450000.00	10	/uploads/products/55ddc370-671b-467d-83c3-533ed0-1787793494121-284981043.webp	f	15	2026-08-15 06:52:33.534	2026-08-27 01:25:47.48	{/uploads/products/55ddc370-671b-467d-83c3-533ed0-1787793494121-284981043.webp}
9	Washer Handshower	washer-handshower	Kepala handshower tekanan tinggi dengan penyaring air kotor terintegrasi.	18000.00	10	/uploads/products/at113gba-geranium-bath-shower--1787793370479-667425668.jpg	f	21	2026-08-15 06:52:33.541	2026-08-27 01:41:23.429	{/uploads/products/at113gba-geranium-bath-shower--1787793370479-667425668.jpg}
\.


--
-- Data for Name: stock_movements; Type: TABLE DATA; Schema: public; Owner: 4ntith3sis
--

COPY public.stock_movements (id, "productId", type, quantity, "previousStock", "newStock", note, "adminId", "createdAt") FROM stdin;
2	2	RESTOCK	18	0	18	Stok awal produk (Seed Phase 1)	1	2026-08-15 06:52:33.53
3	3	RESTOCK	12	0	12	Stok awal produk (Seed Phase 1)	1	2026-08-15 06:52:33.532
4	4	RESTOCK	20	0	20	Stok awal produk (Seed Phase 1)	1	2026-08-15 06:52:33.533
5	5	RESTOCK	5	0	5	Stok awal produk (Seed Phase 1)	1	2026-08-15 06:52:33.535
9	9	RESTOCK	10	0	10	Stok awal produk (Seed Phase 1)	1	2026-08-15 06:52:33.541
10	10	RESTOCK	4	0	4	Stok awal produk (Seed Phase 1)	1	2026-08-15 06:52:33.543
11	11	RESTOCK	3	0	3	Stok awal produk (Seed Phase 1)	1	2026-08-15 06:52:33.545
12	12	RESTOCK	14	0	14	Stok awal produk (Seed Phase 1)	1	2026-08-15 06:52:33.546
16	16	RESTOCK	22	0	22	Stok awal produk (Seed Phase 1)	1	2026-08-15 06:52:33.553
17	5	RESTOCK	5	5	10	Restock gudang pusat	1	2026-08-15 15:15:56.579
21	19	RESTOCK	15	0	15	Stok awal produk (Seed Phase 1)	1	2026-08-25 23:50:25.32
22	20	RESTOCK	12	0	12	Stok awal produk (Seed Phase 1)	1	2026-08-25 23:50:25.328
23	21	RESTOCK	25	0	25	Stok awal produk (Seed Phase 1)	1	2026-08-25 23:50:25.336
24	22	RESTOCK	18	0	18	Stok awal produk (Seed Phase 1)	1	2026-08-25 23:50:25.349
25	23	RESTOCK	14	0	14	Stok awal produk (Seed Phase 1)	1	2026-08-25 23:50:25.356
26	24	RESTOCK	3	0	3	Stok awal pembuatan produk	1	2026-08-27 01:40:49.189
\.


--
-- Data for Name: store_settings; Type: TABLE DATA; Schema: public; Owner: 4ntith3sis
--

COPY public.store_settings (id, "storeName", "whatsappNumber", email, address, description, "updatedAt") FROM stdin;
1	Edgar Space	6281234567890	hello@edgarspace.com	Bandung, Jawa Barat, Indonesia	Showroom furnitur dan dekorasi rumah bergaya hangat, natural, dan modern.	2026-08-25 23:50:25.437
\.


--
-- Name: admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: 4ntith3sis
--

SELECT pg_catalog.setval('public.admins_id_seq', 3, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: 4ntith3sis
--

SELECT pg_catalog.setval('public.categories_id_seq', 21, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: 4ntith3sis
--

SELECT pg_catalog.setval('public.products_id_seq', 24, true);


--
-- Name: stock_movements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: 4ntith3sis
--

SELECT pg_catalog.setval('public.stock_movements_id_seq', 26, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: 4ntith3sis
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: 4ntith3sis
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: 4ntith3sis
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: 4ntith3sis
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: stock_movements stock_movements_pkey; Type: CONSTRAINT; Schema: public; Owner: 4ntith3sis
--

ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT stock_movements_pkey PRIMARY KEY (id);


--
-- Name: store_settings store_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: 4ntith3sis
--

ALTER TABLE ONLY public.store_settings
    ADD CONSTRAINT store_settings_pkey PRIMARY KEY (id);


--
-- Name: admins_email_key; Type: INDEX; Schema: public; Owner: 4ntith3sis
--

CREATE UNIQUE INDEX admins_email_key ON public.admins USING btree (email);


--
-- Name: categories_slug_idx; Type: INDEX; Schema: public; Owner: 4ntith3sis
--

CREATE INDEX categories_slug_idx ON public.categories USING btree (slug);


--
-- Name: categories_slug_key; Type: INDEX; Schema: public; Owner: 4ntith3sis
--

CREATE UNIQUE INDEX categories_slug_key ON public.categories USING btree (slug);


--
-- Name: products_categoryId_idx; Type: INDEX; Schema: public; Owner: 4ntith3sis
--

CREATE INDEX "products_categoryId_idx" ON public.products USING btree ("categoryId");


--
-- Name: products_createdAt_idx; Type: INDEX; Schema: public; Owner: 4ntith3sis
--

CREATE INDEX "products_createdAt_idx" ON public.products USING btree ("createdAt");


--
-- Name: products_price_idx; Type: INDEX; Schema: public; Owner: 4ntith3sis
--

CREATE INDEX products_price_idx ON public.products USING btree (price);


--
-- Name: products_slug_idx; Type: INDEX; Schema: public; Owner: 4ntith3sis
--

CREATE INDEX products_slug_idx ON public.products USING btree (slug);


--
-- Name: products_slug_key; Type: INDEX; Schema: public; Owner: 4ntith3sis
--

CREATE UNIQUE INDEX products_slug_key ON public.products USING btree (slug);


--
-- Name: stock_movements_productId_idx; Type: INDEX; Schema: public; Owner: 4ntith3sis
--

CREATE INDEX "stock_movements_productId_idx" ON public.stock_movements USING btree ("productId");


--
-- Name: products products_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: 4ntith3sis
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: stock_movements stock_movements_adminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: 4ntith3sis
--

ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT "stock_movements_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: stock_movements stock_movements_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: 4ntith3sis
--

ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT "stock_movements_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict vj6HqF7ojlQ3WT22OzIwoEgmR51RLijabTu7qabPX42idWLhhYdTogeQF4O66jJ

