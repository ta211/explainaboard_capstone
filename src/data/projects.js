const names = [
    "Taylor Marshall",
    "T. Steve Myers",
    "Jacob B. Matthrews",
    "Harper T. Montgomery",
    "Dorothy M. (PM)",
    "Alex Meridian (UX)",
    "Pablo W. (Data)",
    "Orion Park (PM)",
    "Meggie Trudon (Annotator)",
];

const your_name = "Nora S. Martainez";

const your_projects = [
    {
        name: "[BERT] Article Topic Classfication",
        task: "text-classification",
        dataset: "gmu_anlp",
        authors: [
            your_name,
            names[4],
            names[6],
        ]
    },
    {
        name: "[GPT-4] Meeting Summarization",
        task: "summarization",
        dataset: "gaokao2019",
        authors: [
            your_name,
            names[2],
        ]
    }
]

const public_projects = [
    {
        name: "ER Assignment 4",
        task: "named-entity-recognition",
        dataset: "masakhaner-mos",
        authors: [
            names[3],
            names[0],
            names[7]
        ]
    },
    {
        name: "News Chunking 2023-04",
        task: "chunking",
        dataset: "conll00_chunk",
        authors: [
            names[2],
            names[0],
        ]
    },{
        name: "[RoBERTa] Sentiment Analysis on Twitter Data",
        task: "aspect-based-sentiment-classification",
        dataset: "twitter",
        authors: [
            names[1],
            names[5],
            names[4],
        ]
    },
    {
        name: "[T5] Question Answering on Hot Pot event planning",
        task: "qa-extractive",
        dataset: "hotpot-qa",
        authors: [
            your_name,
            names[2],
            names[8],
        ]
    },
    {
        name: "[GPT-3] Poetry Generation using Wikipedia dataset",
        task: "conditional-generation",
        dataset: "wikilingua|en",
        authors: [
            names[8],
            names[3],
        ]
    },
    {
        name: "[XLNet] Multi-lingual Machine Translation",
        task: "machine-translation",
        dataset: "wmt-20|encs",
        authors: [
            names[3],
            names[7],
        ]
    }    
]

export { your_name, names, your_projects, public_projects };