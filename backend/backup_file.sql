--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: blogs; Type: TABLE; Schema: public; Owner: tpl522_14
--

CREATE TABLE public.blogs (
    id integer NOT NULL,
    title character varying(100),
    content character varying(8000)
);


ALTER TABLE public.blogs OWNER TO tpl522_14;

--
-- Name: blogs_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl522_14
--

CREATE SEQUENCE public.blogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blogs_id_seq OWNER TO tpl522_14;

--
-- Name: blogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl522_14
--

ALTER SEQUENCE public.blogs_id_seq OWNED BY public.blogs.id;


--
-- Name: blogs id; Type: DEFAULT; Schema: public; Owner: tpl522_14
--

ALTER TABLE ONLY public.blogs ALTER COLUMN id SET DEFAULT nextval('public.blogs_id_seq'::regclass);


--
-- Data for Name: blogs; Type: TABLE DATA; Schema: public; Owner: tpl522_14
--

COPY public.blogs (id, title, content) FROM stdin;
3	K-Pop's Global Influence	South Korea's vibrant music industry, known as K-pop, has taken the world by storm. This musical genre is a mix of infectious beats, eye-catching choreography, and artistically produced music videos, with bands like BTS and Blackpink leading the global wave. What sets K-pop apart is the intense training that idols undergo before debuting, often spending years perfecting singing, dancing, and public speaking. The genre’s influence is so widespread that it’s not just about music; it drives fashion trends, language learning, and even tourism, as fans flock to South Korea to experience the culture firsthand.
1	The Importance of Kimchi	kimchi, a spicy fermented vegetable dish, is a cornerstone of South Korean cuisine and has been enjoyed for centuries. Typically made from napa cabbage or radishes, kimchi is seasoned with chili pepper, garlic, ginger, and other spices before being fermented. This beloved dish is not just a side item but represents South Korea’s deep connection to its agricultural roots. It’s so important that the country even has an annual kimchi-making season called 'Kimjang,' where families and communities come together to prepare large batches to last through the winter months.
2	Hanbok: Traditional Korean Attire	The hanbok, South Korea’s traditional clothing, is celebrated for its elegant, flowing lines and vibrant colors. Typically worn during special occasions like weddings, festivals, or Lunar New Year celebrations, the hanbok reflects centuries-old fashion that still holds a symbolic place in Korean culture. While modern versions exist, the original designs, featuring billowing skirts for women and loose-fitting trousers for men, aim to reflect balance and harmony, key values in Korean culture. Today, you can often see people donning hanboks in historical areas like Gyeongbokgung Palace, blending past and present.
\.


--
-- Name: blogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl522_14
--

SELECT pg_catalog.setval('public.blogs_id_seq', 13, true);


--
-- Name: blogs blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl522_14
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

