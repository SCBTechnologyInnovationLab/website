import "server-only";

import type { Metadata } from "next";
import { assetPath } from "../asset-path";

export type EditorialKind = "news" | "blog";

/** Plain-text blocks are rendered by React. Raw HTML and executable markup are not supported. */
export type EditorialBlock =
  | { readonly type: "paragraph"; readonly text: string }
  | { readonly type: "heading"; readonly text: string }
  | { readonly type: "list"; readonly items: readonly string[]; readonly ordered?: boolean }
  | { readonly type: "quote"; readonly text: string; readonly attribution?: string }
  | { readonly type: "link"; readonly text: string; readonly href: string };

export interface EditorialEntry {
  /** Stable, lowercase URL identifier. Changing it breaks previously shared links. */
  readonly slug: string;
  readonly title: string;
  /** Publication date in YYYY-MM-DD format. It is displayed in UTC. */
  readonly date: string;
  readonly summary: string;
  readonly status: "draft" | "published";
  readonly author?: string;
  /** Approved local photo or bespoke blog illustration, displayed in a circle. */
  readonly image?: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
  };
  readonly body: readonly EditorialBlock[];
}

/**
 * Add only approved content here. There are no invented posts or announcements.
 * Copy the DRAFT template from docs/content-authoring.md; it is intentionally
 * outside these entry arrays. Drafts are filtered before routes or UI receive data.
 * A public repository is not a private place to store unpublished material.
 */
const newsEntries: readonly EditorialEntry[] = [
  {
    slug: "dnd-seq-nyu-isg-nano-seminar-2026",
    title: "We share D&D-seq at NYU’s ISG Nano Seminar",
    date: "2026-10-29",
    summary: "An invited presentation by Ivan Raimondi, and a lively exchange about science and technology development at NYU’s Institute for Systems Genetics.",
    status: "published",
    image: {
      src: "/blog-images/dnd-nyu-seminar.svg",
      alt: "Conceptual illustration of a DNA-bound protein and paired molecular readouts inside speech bubbles representing scientific exchange.",
      width: 600,
      height: 600,
    },
    body: [
      { type: "paragraph", text: "On October 29, 2026, we were invited to share D&D-seq at the Nano Seminar of NYU Langone Health’s Institute for Systems Genetics (ISG). Ivan Raimondi presented our work and joined the discussion about science and technology development." },
      { type: "paragraph", text: "ISG brings together systems biology, genome engineering, human genetics, and computation to investigate how genomes function. That interdisciplinary setting made it a fitting place to discuss the questions that motivate our work and the technologies we develop to address them." },
      { type: "paragraph", text: "We had a lot of fun talking science and technology development. Thank you to our hosts for the invitation and the conversation!" },
      { type: "link", text: "About NYU’s Institute for Systems Genetics", href: "https://med.nyu.edu/departments-institutes/systems-genetics/" },
      { type: "link", text: "Explore D&D-seq", href: "/technologies/dnd-seq/" },
    ],
  },
  {
    slug: "roswell-park-genomics-epigenomics-symposium-2026",
    title: "Ivan Raimondi speaks at Roswell Park",
    date: "2026-09-30",
    summary: "6th Translational Genomics & Epigenomics Symposium · Buffalo, NY",
    status: "published",
    image: {
      src: "/news-images/roswell-park-symposium-2026.webp",
      alt: "Ivan Raimondi speaking at the Roswell Park lectern beside a projected scientific slide.",
      width: 1536,
      height: 2048,
    },
    body: [
      { type: "paragraph", text: "Ivan Raimondi was an invited speaker at the 6th Translational Genomics & Epigenomics Symposium, held at Roswell Park Comprehensive Cancer Center in Buffalo on September 24–25, 2026." },
      { type: "paragraph", text: "The symposium brought together researchers working on genomic and epigenomic technologies and their applications to cancer and other chronic diseases." },
      { type: "link", text: "About the symposium", href: "https://www.roswellparkomicssymposium.org/" },
    ],
  },
];
const blogEntries: readonly EditorialEntry[] = [
{
  "slug": "from-cell-snapshots-to-genetic-rescue",
  "title": "From cell snapshots to genetic rescue",
  "date": "2026-10-26",
  "summary": "DynaVelo learns joint RNA and chromatin-accessibility dynamics, then nominates genetic rescue targets tested in mice. We examine what the model learns, what the experiments validate and what remains inferred.",
  "status": "published",
  "image": {
    "src": "/blog-images/snapshots-to-rescue.svg",
    "alt": "Conceptual paired molecular snapshots feeding branching paths, with a red intervention path and a separate two-part measurement of rescue.",
    "width": 600,
    "height": 600
  },
  "body": [
    {
      "type": "paragraph",
      "text": "Single-cell sequencing gives us an extraordinary census of molecular states. It usually destroys the cells it measures. The resulting dataset can show which states coexist, but the route between them has to be inferred. That distinction becomes especially important when we ask a model to choose an intervention: an attractive trajectory plot is a much easier result to obtain than a useful genetic prediction."
    },
    {
      "type": "paragraph",
      "text": "DynaVelo, published in Nature Biotechnology on October 21, 2026, takes that harder question seriously. Alireza Karbalayghareh, Benedikt Pelzer, Christopher R. Chin, Ari Melnick, Darko Barisic and Christina S. Leslie combine paired RNA and chromatin-accessibility measurements in a dynamical model, then use it to nominate genetic changes that could counteract an abnormal B-cell state. The paper includes mouse experiments testing the nominated targets. The central question is how the modeling and the validation fit together, and where their conclusions stop."
    },
    {
      "type": "link",
      "text": "Read the peer-reviewed DynaVelo paper",
      "href": "https://www.nature.com/articles/s41587-026-03348-1"
    },
    {
      "type": "heading",
      "text": "A demanding system for learning motion"
    },
    {
      "type": "paragraph",
      "text": "Germinal centers are sites where B cells proliferate, undergo selection and differentiate during an immune response. Cells move between a proliferative dark zone and a selection-associated light zone; some recycle, while others move toward memory or antibody-secreting fates. A simple one-way developmental line misses much of this behavior. A method that orders cells beautifully but reverses a recycling route can give a misleading account of the biology."
    },
    {
      "type": "paragraph",
      "text": "The study starts with wild-type mouse germinal-center B cells and then considers heterozygous loss of Arid1a or Ctcf. Heterozygous means that one gene copy is affected, rather than both. These changes disturb the balance of states and their inferred transitions. Arid1a is a component of a chromatin-remodeling complex and is recurrently altered in B-cell lymphomas, making the system biologically meaningful without turning a normal mouse immune-response experiment into a cancer-treatment trial."
    },
    {
      "type": "heading",
      "text": "What goes into the model"
    },
    {
      "type": "paragraph",
      "text": "Each profiled cell supplies two related views. RNA counts report gene expression. ATAC-seq reports accessible chromatin, from which chromVAR computes accessibility scores for transcription-factor motifs. Motifs are short sequence patterns associated with factor binding. Their accessibility can be informative about regulatory activity, but it does not directly measure a particular factor occupying a particular site. Closely related factors may also recognize similar motifs."
    },
    {
      "type": "paragraph",
      "text": "DynaVelo compresses the RNA and motif measurements into separate latent representations and learns their coupled evolution with a neural ordinary differential equation. An ordinary differential equation describes how a state changes; here, a neural network supplies the function specifying that change. The model then decodes the evolving latent state back into predicted RNA expression and motif accessibility. This provides a continuous rule for motion through state space, rather than only an ordering of the observed cells."
    },
    {
      "type": "paragraph",
      "text": "The direction of motion does not appear from nowhere. The model is guided by RNA-velocity estimates from scVelo for genes with sufficient spliced and unspliced coverage. Its training objective combines reconstruction of the observations, agreement with those partial velocity estimates, consistency between the two modalities and regularization of latent states and times. The methods describe roughly 400\u20131,000 velocity genes per sample and approximately 3,000\u20134,000 modeled genes after combining variable genes, velocity genes, expressed factors and selected genes of interest."
    },
    {
      "type": "paragraph",
      "text": "Consequently, \u201cvelocity\u201d here remains a model-derived rate of change. Latent time is an inferred coordinate, not a stopwatch reading for a tracked cell. Extending predictions to more genes does not mean that their rates were independently measured. These qualifications matter when deciding which outputs can support an experimental hypothesis."
    },
    {
      "type": "heading",
      "text": "From a vector field to a perturbation"
    },
    {
      "type": "paragraph",
      "text": "A vector field assigns a direction and rate of change to each modeled state. Once the field is represented as an explicit function, we can ask how it changes when an input changes. DynaVelo uses local sensitivity calculations, through Jacobians, to derive state-dependent regulatory relationships. It also makes larger in silico perturbations and compares the resulting RNA and motif velocities with their unperturbed values."
    },
    {
      "type": "paragraph",
      "text": "The implementation gives \u201cknockout\u201d a specific computational meaning: for a transcription factor, both its RNA value and its motif-accessibility value are set to their minimum observed values across cells; for a non-factor gene, only RNA is lowered. This is a defined intervention on model inputs. It is not a simulation of every molecular consequence of deleting DNA, nor a calibrated dose-response prediction. That difference is particularly relevant when the experimental test uses a heterozygous genetic alteration."
    },
    {
      "type": "paragraph",
      "text": "A second subtlety is that the inferred regulatory graph changes with cell state. A relationship that helps explain a proliferating cell need not have the same strength or sign near an exit state. This makes the output potentially more informative than one static network for an entire dataset. It also makes validation harder: a literature-supported connection between two genes may not establish the connection in the particular state or direction predicted by the model."
    },
    {
      "type": "heading",
      "text": "The evidence ladder"
    },
    {
      "type": "paragraph",
      "text": "The first level of evidence is biological reconstruction. In 7,166 wild-type cells, the model recovers major germinal-center routes, including proliferation, movement toward the light zone and recycling. The paper compares these results with scVelo and MultiVelo and reports advantages in this system. This is a useful coherence check, but agreement with expected biology is weaker evidence than predicting an unmeasured response. It should not be read as a universal ranking across tissues and experimental designs."
    },
    {
      "type": "paragraph",
      "text": "The next level asks whether simulated perturbations resemble the differences seen in mutant samples. The study includes 6,716 Arid1a-heterozygous and 4,688 Ctcf-heterozygous cells in its initial analyses. The inferred mutant dynamics lose a recycling route and show altered exit behavior. These comparisons connect the learned field to a genetic contrast, although the observed RNA and accessibility measurements and the inferred velocities still occupy different evidential categories."
    },
    {
      "type": "paragraph",
      "text": "The most compelling step is rescue. Starting from the Arid1a-heterozygous setting, the model nominates Ctcf, Stat3 and Bcl6 as candidate perturbation targets. The evidence combines a previously established Ctcf genetic rescue with new Bcl6 and Stat3 compound-heterozygous mouse experiments. The elevated dark-zone-to-light-zone ratio associated with Arid1a loss is rescued by these additional genetic alterations. The Bcl6 and Stat3 immunophenotyping experiments involve 54 mice across their respective comparison groups, rather than treating thousands of cells as thousands of independent animal replicates."
    },
    {
      "type": "paragraph",
      "text": "For the Arid1a/Ctcf double-heterozygous comparison, the study also generates new multiome data: two wild-type, two Arid1a-heterozygous and two double-heterozygous samples. These allow a closer comparison of molecular states and inferred dynamics. In centrocytes, reported rescue rates are 38% for RNA expression, 64% for RNA velocity, 51% for motif accessibility and 46% for motif velocity. The metric counts features shifting toward wild-type values; it is not the percentage of mice cured, cells fully normalized or disease risk eliminated. The unequal values are useful precisely because they show that different readouts can recover to different extents."
    },
    {
      "type": "link",
      "text": "Public validation dataset: GEO GSE334370",
      "href": "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE334370"
    },
    {
      "type": "heading",
      "text": "What the rescue does, and does not, establish"
    },
    {
      "type": "paragraph",
      "text": "The animal experiments establish functional genetic interactions for a defined phenotype in this system. That is a meaningful advance beyond asking whether generated cells look plausible. They do not validate every inferred regulatory edge, prove that all reconstructed trajectories occurred in individual cells, or establish a therapeutic strategy in humans. The detailed multiome validation is also strongest for the Ctcf combination; the Bcl6 and Stat3 tests demonstrate the reported immunophenotypic rescue rather than an identical depth of molecular validation for every target."
    },
    {
      "type": "paragraph",
      "text": "There are broader inference limits. Snapshot data can be compatible with more than one dynamical explanation. Velocity guidance brings assumptions about RNA processing and coverage. Motif accessibility is a proxy that can leave regulatory mechanisms unresolved. Cells absent from the sampled population cannot automatically be recovered faithfully by a generative model. And a successful genetic rescue in one mouse B-cell context does not establish transfer to another tissue, another perturbation strength or an unseen disease state."
    },
    {
      "type": "paragraph",
      "text": "These are reasons to design sharper experiments, rather than reasons to dismiss the model. The paper supplies an unusually concrete test: choose an intervention using the learned dynamics, make the corresponding genetic comparison and measure a prespecified biological outcome. Separating that external test from quantities inferred by the same analysis pipeline keeps the evidential argument clear."
    },
    {
      "type": "heading",
      "text": "How we would read and use it"
    },
    {
      "type": "paragraph",
      "text": "We would begin with Figure 1 to understand the inputs and intervention definition, then read Figure 6 with its legend and methods to see exactly what was validated. Only after that would we spend time on the trajectory visualizations and inferred networks. This order helps prevent the appearance of a smooth vector field from setting the standard of proof."
    },
    {
      "type": "paragraph",
      "text": "For an experimental group, the practical starting point is a system with paired measurements, enough coverage for directional information, well-defined state transitions and an intervention that can be tested independently. We would predefine the rescue endpoint, preserve biological replicates and compare against simpler baselines before asking whether added model complexity helps. A prospective test should hold the decisive intervention data out of model construction and evaluate both a population phenotype and molecular readouts where feasible. Those are our methodological recommendations, not additional experiments claimed by this paper."
    },
    {
      "type": "paragraph",
      "text": "The authors provide code, training guidance and processed data, making a bounded reproducibility study possible before planning a larger experiment. Reproducing the analysis still requires checking preprocessing, gene and motif selection, parameter sensitivity and the distinction between training samples and validation samples. Public availability makes scrutiny possible; it does not replace it."
    },
    {
      "type": "link",
      "text": "DynaVelo code and training tutorial",
      "href": "https://github.com/karbalayghareh/DynaVelo"
    },
    {
      "type": "link",
      "text": "Processed data linked by the authors",
      "href": "https://doi.org/10.6084/m9.figshare.29169602"
    },
    {
      "type": "paragraph",
      "text": "The practical takeaway is that a useful model of cell-state change should help choose a discriminating experiment. DynaVelo offers a strong example of that loop, connecting multimodal snapshots to a dynamical hypothesis and then to genetic rescue in mice. The next challenge is to learn which parts of that success generalize, while keeping measured outcomes, inferred dynamics and proposed mechanisms clearly separated."
    },
    {
      "type": "paragraph",
      "text": "Illustration: original conceptual artwork showing paired molecular snapshots, inferred branching paths and a separately measured rescue comparison. It is not a reproduction of a paper figure or experimental data. This commentary is based on the peer-reviewed publisher version; the paper is available under a Creative Commons Attribution 4.0 license."
    },
    {
      "type": "link",
      "text": "Publisher PDF, including methods and figure legends",
      "href": "https://www.nature.com/articles/s41587-026-03348-1.pdf"
    },
    {
      "type": "link",
      "text": "Creative Commons Attribution 4.0",
      "href": "https://creativecommons.org/licenses/by/4.0/"
    }
  ]
},
{
  "slug": "when-the-marker-changes-the-message",
  "title": "When the marker changes the message",
  "date": "2026-10-19",
  "summary": "cPRIME reads the RNA consequences of variants edited into their native genomic context. Its most instructive result is that the extra edit used to identify an experiment can change the biology we hoped to measure.",
  "status": "published",
  "image": {
    "src": "/blog-images/variant-marker-rna.svg",
    "alt": "Conceptual DNA-to-RNA comparison: an intended variant and an adjacent marker are tracked together, while a dashed alternative RNA path shows why a missing read can have more than one explanation.",
    "width": 600,
    "height": 600
  },
  "body": [
    {
      "type": "paragraph",
      "text": "A good molecular experiment needs a way to recognize what it changed. That sounds like an administrative problem: label the intervention, recover the label, count the result. But a label written into a biological sequence becomes part of the system under study. Its apparent convenience can conceal an extra intervention."
    },
    {
      "type": "paragraph",
      "text": "A new study from Ghanem El Kassem, Constanze Westphal, Marvin Doebel, Jasmine Hillmer, Tanja Seifert and Michael Boettcher makes that issue unusually concrete. Their method, cPRIME, measures the RNA consequences of genetic variants introduced into endogenous DNA. Along the way, they show that synonymous marker edits, which preserve the encoded amino acid, can alter the RNA-level result attributed to the intended variant."
    },
    {
      "type": "paragraph",
      "text": "The paper was published in Nature Communications on October 15, 2026. It is peer-reviewed research, not a preprint. For us, its value lies in both the measurement strategy and the warning about what we count as an experimental control."
    },
    {
      "type": "link",
      "text": "Paper was published in Nature Communications on October 15, 2026",
      "href": "https://www.nature.com/articles/s41467-026-78344-9"
    },
    {
      "type": "heading",
      "text": "Read the variant twice"
    },
    {
      "type": "paragraph",
      "text": "Imagine introducing a DNA variant into a mixed population of cells and finding very little of that variant in the RNA. Several explanations remain possible. Perhaps the edit barely happened. Perhaps cells carrying it became less abundant. Perhaps the edited RNA was degraded or processed differently. An RNA count alone cannot separate these possibilities."
    },
    {
      "type": "paragraph",
      "text": "cPRIME pairs two measurements: the representation of an edited sequence in genomic DNA and its representation in complementary DNA, the DNA copy made from RNA. The cPRIME score is the variant's cDNA reads per million divided by its genomic-DNA reads per million. The denominator anchors the RNA readout to the representation of the edit actually recovered from the cell population."
    },
    {
      "type": "paragraph",
      "text": "For a purely illustrative example, 100 variant reads per million in genomic DNA and 20 in cDNA would yield a score of 0.2. That is a relative representation measurement. It does not mean that every edited cell has lost precisely 80% of its RNA, or that 80% of cells have a particular phenotype."
    },
    {
      "type": "paragraph",
      "text": "The installation step uses prime editing. A guide RNA specifies the target and carries a template for the intended sequence change; an editor couples a DNA-nicking Cas9 to reverse transcriptase. The study combines pooled variant installation with targeted sequencing of each relevant DNA and RNA region. This keeps the variant in its native genomic setting, while requiring suitable readout designs for the regions being tested."
    },
    {
      "type": "link",
      "text": "Primary paper, Results and Methods",
      "href": "https://www.nature.com/articles/s41467-026-78344-9.pdf"
    },
    {
      "type": "heading",
      "text": "A small second edit solves a real counting problem"
    },
    {
      "type": "paragraph",
      "text": "Rare edits are hard to distinguish from errors introduced during amplification or sequencing. If the intended result differs from the reference by one nucleotide, an accidental wrong base can resemble success."
    },
    {
      "type": "paragraph",
      "text": "The authors therefore add an adjacent synonymous marker and count the combined sequence. Seeing both changes together is a more distinctive signature than seeing either alone. In unedited controls, the background frequency of these combined signatures was reduced by roughly three orders of magnitude relative to single-base calls: 1,280-fold in KBM7 cells and 1,120-fold in K562 cells."
    },
    {
      "type": "paragraph",
      "text": "This is a substantial technical benefit. But synonymous describes a relationship to the protein's amino-acid sequence. RNA processing machinery encounters the nucleotide sequence itself. A change that leaves a codon synonymous can still modify a sequence feature involved in splicing."
    },
    {
      "type": "paragraph",
      "text": "We should therefore regard the combined edit as the actual experimental intervention. Calling one component a marker does not exempt it from biological scrutiny."
    },
    {
      "type": "link",
      "text": "Primary paper, Figure 1 and marker-validation results",
      "href": "https://www.nature.com/articles/s41467-026-78344-9.pdf"
    },
    {
      "type": "heading",
      "text": "The revealing experiment removes the label"
    },
    {
      "type": "paragraph",
      "text": "The initial screen targeted NF1 exon 27 in two leukemia-derived cell lines with different chromosome complements: near-haploid KBM7 and near-triploid K562. Nonsense variants, which introduce premature stop codons, had low cPRIME scores, consistent with RNA loss through nonsense-mediated decay. Some variants without a premature stop also showed reduced scores."
    },
    {
      "type": "paragraph",
      "text": "To investigate, the authors tested selected edits individually and compared versions with and without the synonymous marker. Among three non-stop variants selected for strong RNA depletion, only one retained a reduced score after marker removal, and its effect was weaker. For another, changing the particular marker substitution also removed the strong phenotype."
    },
    {
      "type": "paragraph",
      "text": "The key observation is dependence on the exact combined sequence. The AI-based splice predictor Pangolin helped identify combinations consistent with new splice-site activity. These predictions help interpret the RNA signal; they do not, by themselves, establish the complete resulting transcript structure."
    },
    {
      "type": "paragraph",
      "text": "This is a useful role for computational prediction in an experimental workflow: inspect the supposedly auxiliary edit, propose why it might matter, and use that suspicion to design a discriminating comparison. We would be much less persuaded by agreement between a model and a pooled screen without the marker-removal experiments."
    },
    {
      "type": "link",
      "text": "Primary paper, synonymous-marker validation section",
      "href": "https://www.nature.com/articles/s41467-026-78344-9.pdf"
    },
    {
      "type": "heading",
      "text": "What disappears from the readout?"
    },
    {
      "type": "paragraph",
      "text": "The assay's RNA measurement has a precise boundary. The detected transcript must retain the sequence being searched, the flanking primer-binding sites and an approximately canonical amplified-product size. The workflow includes size selection before sequencing."
    },
    {
      "type": "paragraph",
      "text": "Consequently, a low score can arise when less transcript survives, but it can also arise when processing produces RNA that the chosen assay does not capture. An alternative isoform may exist even though the expected product is depleted. The authors explicitly distinguish loss of the detected isoform from a necessary reduction in total transcript abundance."
    },
    {
      "type": "paragraph",
      "text": "That distinction should travel with every exported result. A column named “RNA loss” could quietly overstate what was measured. A more defensible description is reduced representation of the detected edited transcript relative to genomic DNA."
    },
    {
      "type": "paragraph",
      "text": "For mechanistic follow-up, we would ask which transcripts remain and what they encode. Isoform-resolved measurements, independent amplification designs and appropriate tests of RNA decay can address different parts of that question. Protein-level or cellular-function assays remain necessary when the biological claim concerns function beyond RNA."
    },
    {
      "type": "link",
      "text": "Primary paper, readout definition and Discussion",
      "href": "https://www.nature.com/articles/s41467-026-78344-9.pdf"
    },
    {
      "type": "heading",
      "text": "Scale has two different meanings"
    },
    {
      "type": "paragraph",
      "text": "The expanded experiment used 341 guide designs representing 178 intended edits across six NF1 exons. The authors reported a correlation of 0.91 between cPRIME scores in the two cell lines, supporting reproducibility for the variants that could be quantified."
    },
    {
      "type": "paragraph",
      "text": "However, library size and usable measurement coverage are different quantities. For the additional exons, the fraction of edits detected above threshold ranged from 7.3% to 38% in KBM7 and 7.3% to 35% in K562. The study maintained substantial cell coverage, yet editing efficiency remained strongly dependent on the target and guide."
    },
    {
      "type": "paragraph",
      "text": "For experimental planning, the relevant denominator is therefore the set of intended biological questions, including those that produced no interpretable measurement. A well-reproduced subset can coexist with large gaps. Missing observations should remain visibly missing rather than becoming implicit evidence of no effect."
    },
    {
      "type": "paragraph",
      "text": "There is also a boundary on biological transfer. These experiments used engineered leukemia cell lines, including disruption of MLH1 to improve editing. Agreement between them is encouraging, but does not establish equivalent performance in a primary cell type, another gene or a disease-relevant tissue. The multi-region demonstration here spans six exons of one gene."
    },
    {
      "type": "link",
      "text": "Primary paper, multi-exon screen and Discussion",
      "href": "https://www.nature.com/articles/s41467-026-78344-9.pdf"
    },
    {
      "type": "heading",
      "text": "Read a perfect classification score with its denominator"
    },
    {
      "type": "paragraph",
      "text": "The clinical comparison provides a particularly useful lesson in interpretation. After filtering, the authors reported an area under the receiver-operating-characteristic curve of 1.0 for separating three pathogenic or likely pathogenic variants from seventeen benign or likely benign variants in each cell line."
    },
    {
      "type": "paragraph",
      "text": "Those twenty variants matter as much as the headline number. The library was enriched for positions with predicted splice activity, and this analysis excluded nonsense variants and several other annotation categories. It is a small, selected proof of principle, as the paper itself acknowledges."
    },
    {
      "type": "paragraph",
      "text": "We should not convert that result into a claim that cPRIME can classify arbitrary uncertain variants with perfect accuracy. A variant can affect protein activity while leaving this RNA readout relatively unchanged. Conversely, an RNA-level change needs biological and clinical context before it can support a disease interpretation. The study's statistical RNA-response groups are descriptive screen categories, not clinically calibrated pathogenicity thresholds."
    },
    {
      "type": "link",
      "text": "Primary paper, Figure 4 and accompanying analysis",
      "href": "https://www.nature.com/articles/s41467-026-78344-9.pdf"
    },
    {
      "type": "heading",
      "text": "What we would carry into the next screen"
    },
    {
      "type": "paragraph",
      "text": "Our practical reading is to preserve the full intervention and the full measurement history:"
    },
    {
      "type": "list",
      "items": [
        "Record intended edits and markers together, including alternative marker designs",
        "Evaluate both the intended sequence change and the combined sequence when checking predicted splice effects",
        "Confirm important hits with an independent marker or a marker-free design where feasible",
        "Report how many intended variants passed measurement thresholds, alongside the results for those that did",
        "Keep transcript-specific depletion separate from total RNA abundance, protein function and clinical interpretation"
      ],
      "ordered": false
    },
    {
      "type": "paragraph",
      "text": "These are proposed evaluation principles, not additional experiments reported here. They make the data easier to reuse because they preserve the distinction between an intervention, its detection strategy and the conclusion drawn from it."
    },
    {
      "type": "paragraph",
      "text": "cPRIME offers an experimentally grounded way to connect DNA changes to RNA outcomes. Its most transferable lesson is that assay engineering deserves the same causal scrutiny as the biological question. If we change a sequence to make it easier to recognize, we also need to ask what that recognizable sequence does."
    },
    {
      "type": "paragraph",
      "text": "Reading note: this article is based on the complete primary manuscript, including its main-text methods and figure legends, and the author-maintained analysis repository. Results are author-reported; we have not reanalyzed the raw data or independently inspected all supplementary datasets. The publication is open access under CC BY 4.0. This commentary and its conceptual illustration are original; the illustration contains no experimental data."
    },
    {
      "type": "link",
      "text": "Author-maintained analysis repository",
      "href": "https://github.com/Boettcher-Lab/cPRIME"
    },
    {
      "type": "link",
      "text": "CC BY 4.0",
      "href": "https://creativecommons.org/licenses/by/4.0/"
    }
  ]
},
{
  "slug": "what-a-virtual-cell-should-predict",
  "title": "What should a virtual cell predict?",
  "date": "2026-10-12",
  "summary": "PIE uses biological knowledge to predict population-level perturbation effects. We examine its held-out tests, the meaning of zero-shot transfer, and what an experimental team should validate before relying on its predictions.",
  "status": "published",
  "image": {
    "src": "/blog-images/knowledge-meets-perturbation.svg",
    "alt": "Conceptual evidence cards feeding a grid of measured and held-out conditions, with an outlined missing condition linked to a predicted population response.",
    "width": 600,
    "height": 600
  },
  "body": [
    {
      "type": "paragraph",
      "text": "A perturbation screen leaves a familiar kind of unfinished map: some interventions have been measured in one cell system, fewer in another, and most possible combinations remain blank. Filling a blank is a useful ambition for AI. But first we need to decide what belongs in that square. A synthetic profile for every cell? A distribution of possible states? Or a ranked list of genes expected to respond? Those are different prediction problems, with different experimental uses."
    },
    {
      "type": "paragraph",
      "text": "PIE, introduced by Rishi Verma and colleagues at Arc Institute in an October 2026 preprint and released on October 5, chooses a population-level target. It predicts population-level transcriptional effects using existing biological knowledge alongside experimental evidence. We examine the public model release, code documentation and benchmark cards to understand what this narrower target makes possible, and what it leaves unresolved. The work is a preprint, not peer-reviewed validation."
    },
    {
      "type": "link",
      "text": "Primary preprint: Verma et al., PIE: Generalizing perturbation effects across unseen perturbations, contexts and datasets",
      "href": "https://doi.org/10.64898/2026.10.02.756297"
    },
    {
      "type": "heading",
      "text": "Start with the quantity an experiment can test"
    },
    {
      "type": "paragraph",
      "text": "PIE returns three outputs for each measured gene: a probability of differential expression, a predicted log2 fold change, and a predicted change in mean expression on the preprocessed scale. These describe a population response. They do not reconstruct the fate of an individual cell, nor establish which subpopulation produced the change."
    },
    {
      "type": "paragraph",
      "text": "This distinction matters experimentally. Imagine a treatment for which half the cells increase a transcript and half decrease it. A population mean can conceal that split. Conversely, if the immediate decision is which ten perturbations to test next for a reproducible population shift, estimating every individual transcriptome may be unnecessary. A useful model should be judged against the decision it is meant to support, rather than the breadth suggested by the phrase virtual cell."
    },
    {
      "type": "link",
      "text": "Author-maintained within-dataset model card: output definitions and evaluation",
      "href": "https://huggingface.co/arcinstitute/PIE_replogle_wdataset"
    },
    {
      "type": "heading",
      "text": "Give the model more than a perturbation name"
    },
    {
      "type": "paragraph",
      "text": "An unseen gene identifier is a weak basis for extrapolation. PIE supplies representations of what is already known about the experimental context and perturbation. Arc describes inputs drawn from curated resources, including cell-line descriptions, gene annotations and dependency profiles. It also uses control-cell expression and pooled response evidence from the training data. The model therefore combines prior knowledge with measurements rather than expecting one expression matrix to contain every relevant relationship."
    },
    {
      "type": "paragraph",
      "text": "The architecture is based on Perceiver IO: heterogeneous input representations are combined into a latent representation that can be queried for outputs. Gene descriptions provide queries for the genes whose responses are requested. This separates the input evidence from the output vocabulary. In practical terms, a model can receive different kinds of evidence about a condition while still returning comparable gene-level readouts."
    },
    {
      "type": "link",
      "text": "Official implementation and released experiment definitions",
      "href": "https://github.com/ArcInstitute/pie"
    },
    {
      "type": "paragraph",
      "text": "A useful way to think about this is a structured evidence dossier. A gene description can connect an unfamiliar target to known processes; a dependency profile can describe how biological contexts differ; control expression anchors the untreated state. This is an explanatory analogy, not a claim that the model reasons like a scientist. A convincing-looking annotation can also encode yesterday’s consensus, uneven coverage or information closely related to the evaluation target."
    },
    {
      "type": "link",
      "text": "Arc’s October 5 release: knowledge sources and design rationale",
      "href": "https://arcinstitute.org/news/pie"
    },
    {
      "type": "heading",
      "text": "Unseen is not a single experimental condition"
    },
    {
      "type": "paragraph",
      "text": "The released within-dataset benchmark separates three tests: a held-out cell line with previously observed perturbations; new perturbations in the training cell lines; and both a held-out line and new perturbations. Four models hold out HepG2, Jurkat, K562 or RPE1 in turn. The model card reports mean AUPRC values of 0.4155, 0.3048 and 0.2366, respectively, across those four folds."
    },
    {
      "type": "paragraph",
      "text": "AUPRC measures how well a score ranks positive cases across precision–recall trade-offs. Here it concerns differential-expression classification, not an overall percentage of correct biological predictions. Its interpretation depends on how common positive labels are and how those labels were defined. The decreasing values are informative about difficulty within this release; they should not be read as a universal exchange rate between cell lines, donors and tissues."
    },
    {
      "type": "paragraph",
      "text": "For a prospective experiment, this separation suggests a simple question to ask before choosing a checkpoint: which part of our intended test is actually new? A previously tested intervention in a new context and an unfamiliar intervention in that context place different demands on a model. Reporting them together can hide the failure mode that matters most."
    },
    {
      "type": "link",
      "text": "Four-fold benchmark definitions, means and standard deviations",
      "href": "https://huggingface.co/arcinstitute/PIE_replogle_wdataset#evaluation"
    },
    {
      "type": "heading",
      "text": "Zero-shot transfer still needs an untreated reference"
    },
    {
      "type": "paragraph",
      "text": "A second released model trains on Tahoe, Jiang, ARC VCC 25 and Orion, then evaluates on Replogle without training or fine-tuning on Replogle response labels. The author-maintained card explicitly states that target-context control expression is an inference input. Zero-shot here therefore means no training on the target response labels; it does not mean that the target biological system is represented by no measurements at all."
    },
    {
      "type": "paragraph",
      "text": "The cross-dataset card reports mean AUPRC of 0.3802 for perturbations seen in training and 0.2463 for unseen perturbations, with equal weight across the four target cell lines. These are distinct evaluation groups, not a controlled estimate of how much any individual laboratory will gain. The accompanying assets include pinned dataset and split revisions, making it possible to identify what a reported checkpoint was allowed to see."
    },
    {
      "type": "link",
      "text": "Cross-dataset model card: training boundaries, control inputs and numerical results",
      "href": "https://huggingface.co/arcinstitute/PIE_replogle_xdataset"
    },
    {
      "type": "heading",
      "text": "A benchmark needs a positive control too"
    },
    {
      "type": "paragraph",
      "text": "A separate peer-reviewed study by Miller, Mejia and colleagues, published in Nature Biotechnology on October 1, makes a complementary point. Across 14 datasets and 18 metrics, it tests whether evaluation metrics can distinguish informative positive controls from uninformative baselines. Its calibration analysis shows why averaging error over many weakly changing genes can obscure perturbation-specific signal. It is not an independent validation of PIE."
    },
    {
      "type": "paragraph",
      "text": "We should take two lessons together. A high aggregate score does not guarantee useful perturbation discrimination, and a disappointing score does not automatically show that a model learned nothing. Choose the biological question first, then inspect multiple views of performance: gene ranking, effect direction and size, and whether different interventions can actually be distinguished. No single metric makes the other checks redundant."
    },
    {
      "type": "link",
      "text": "Peer-reviewed context: Deep learning perturbation models can outperform baselines on calibrated metrics",
      "href": "https://www.nature.com/articles/s41587-026-03307-w"
    },
    {
      "type": "heading",
      "text": "What we would require before trusting a new application"
    },
    {
      "type": "list",
      "items": [
        "Define the target output. A population shift, a rare responding state and a change in cell-state proportions require different validation readouts.",
        "Freeze the evidence boundary. Record training splits, checkpoint versions, annotation sources and which target-context controls are supplied. Audit overlap instead of treating an unseen label as proof of independence.",
        "Compare against an appropriate simple baseline and an empirical positive control. Keep preprocessing and test populations identical across comparisons.",
        "Test a genuinely new experimental context. Four cell-line folds do not establish transfer to primary donors, disease tissue, another time point or another perturbation modality.",
        "Retain experimental uncertainty. A predicted differential-expression probability is not automatically a calibrated probability of replication in our laboratory.",
        "Use predictions to prioritize a bounded experiment. Prespecify the readout and success criterion before seeing whether the favored candidates work."
      ]
    },
    {
      "type": "paragraph",
      "text": "These are our proposed evaluation criteria, not additional experiments reported by the PIE authors. They deliberately separate a promising ranking tool from a validated biological simulator. They also preserve a role for measurements that an aggregate predictor cannot supply: heterogeneity, transient states, and responses whose importance is not captured by mean RNA abundance."
    },
    {
      "type": "heading",
      "text": "The practical change is a more precise ambition"
    },
    {
      "type": "paragraph",
      "text": "PIE makes a concrete contribution to the virtual-cell discussion: a model can aim directly at interpretable screen-level effects and bring curated knowledge into the prediction. That is a useful alternative to judging progress only by how comprehensively a system appears to imitate a cell. The immediate opportunity is to ask better questions of missing experiments; the obligation is to test whether the proposed answers survive a change of context."
    },
    {
      "type": "paragraph",
      "text": "Reading note: this article draws on the authors’ public release, model cards and implementation documentation, with the linked preprint as the primary research record. We did not independently reproduce the benchmark or inspect its complete manuscript and supplementary analyses. Numerical results above are author-reported. The illustration is conceptual and contains no experimental data."
    },
    {
      "type": "paragraph",
      "text": "For reuse, check the terms of each asset: the code repository lists CC BY-NC-SA 4.0, while the model cards identify a separate non-commercial checkpoint license and acceptable-use policy. Public availability is not blanket permission for every deployment."
    },
    {
      "type": "link",
      "text": "Code license and project documentation",
      "href": "https://github.com/ArcInstitute/pie#license"
    }
  ]
},
  {
    "slug": "a-protein-can-carry-a-watermark",
    "title": "A protein can carry a watermark. What does it prove?",
    "date": "2026-10-05",
    "summary": "SynthIDBio embeds detectable signals in designed protein sequences and predicted structures. We examine the binding evidence, the detection trade-offs, and what a watermark can establish about provenance.",
    "status": "published",
    "image": {
      "src": "/blog-images/protein-watermark-provenance.svg",
      "alt": "Conceptual folded protein with a distributed red sequence pattern beside a binding partner; an inset shows a pattern across several positions.",
      "width": 600,
      "height": 600
    },
    "body": [
      {
        "type": "paragraph",
        "text": "A designed protein arrives in a laboratory as an amino-acid sequence. It binds its intended target, and the measurement looks convincing. Somewhere between design, export and synthesis, however, the record of how that sequence was generated has become incomplete. The binding assay answers a biological question. Recovering the design history requires a different kind of evidence."
      },
      {
        "type": "paragraph",
        "text": "Function-preserving watermarking of AI-generated proteins, published in Nature on 30 September 2026, makes that second question experimentally tangible. Stutz and colleagues introduce SynthIDBio: methods that place detectable statistical signals in designed protein sequences and predicted structures. The sequence experiments show that a watermark can coexist with strong binding activity. Understanding what this establishes requires us to follow the signal from generation through selection, measurement and detection."
      },
      {
        "type": "link",
        "text": "This week’s paper: Stutz et al., Function-preserving watermarking of AI-generated proteins (Nature, 30 September 2026)",
        "href": "https://www.nature.com/articles/s41586-026-10965-y"
      },
      {
        "type": "heading",
        "text": "Where can a protein carry information about its origin?"
      },
      {
        "type": "paragraph",
        "text": "A protein sequence already contains information about how a molecule can fold and interact. Many positions nevertheless permit more than one plausible amino acid. A design model assigns probabilities to these alternatives. SynthIDBio-sequence uses some of that flexibility to introduce a pattern that a corresponding detector can recognize."
      },
      {
        "type": "paragraph",
        "text": "The authors adapt a text-watermarking method to ProteinMPNN, a model that designs amino-acid sequences for a supplied protein backbone. A secret key and the recent sequence context determine scores for candidate residues. During sampling, the method favors candidates with higher scores. Across the completed sequence, these small preferences accumulate into statistical evidence. The watermark is distributed through the generation choices; no separate chemical label needs to be attached."
      },
      {
        "type": "paragraph",
        "text": "There is a genuine design tension here. Strongly constrained positions offer little choice, while increasing sampling diversity can make detection easier and alter which designs survive downstream filters. The paper compares two watermarking settings. One is called non-distortionary, referring to a mathematical property averaged over keys. That term should not be read as a guarantee that every individual protein is biologically unaffected."
      },
      {
        "type": "paragraph",
        "text": "The DNA used to express a designed binder encodes its amino-acid choices. This study therefore concerns provenance in a protein-design pipeline, rather than a general method for watermarking genomes or recovering the origin of any physical protein sample. The detector needs an appropriate digital input and the corresponding detection procedure."
      },
      {
        "type": "heading",
        "text": "A sequence and a coordinate file are different objects"
      },
      {
        "type": "paragraph",
        "text": "SynthIDBio-structure addresses a separate output: the atomic coordinates predicted by AlphaFold 3. The authors fine-tune the structure model while training a detector to recognize small patterns in local geometry. Its training objective balances structural prediction quality with watermark detection. Because detection uses local geometric features, translating or rotating the complete coordinate model does not remove the relevant information."
      },
      {
        "type": "paragraph",
        "text": "This signal belongs to a digital prediction. The experiment does not show that a synthesized molecule would physically retain the same coordinate watermark, and it does not modify the supplied amino-acid sequence. Structure quality is assessed computationally, whereas the sequence work also includes laboratory binding measurements. Keeping those evidence types separate prevents the phrase “watermarked protein” from carrying more meaning than the experiment supports."
      },
      {
        "type": "paragraph",
        "text": "For their recommended structure model, the authors report similar aggregate structural accuracy to the AlphaFold 3 baseline in the evaluated benchmark. Detection exceeds 99.8% sensitivity at a 0.1% false-positive rate across the three trained variants. Those results establish a promising trade-off in the tested setting; individual local geometries and downstream scientific uses still require their own scrutiny."
      },
      {
        "type": "link",
        "text": "Mechanisms and structure evaluation: Figures 1 and 4 in the paper",
        "href": "https://www.nature.com/articles/s41586-026-10965-y"
      },
      {
        "type": "heading",
        "text": "What “function-preserving” means in the laboratory"
      },
      {
        "type": "paragraph",
        "text": "The wet-lab study starts from fifteen previously validated AlphaProteo binder backbones for each of three targets: PD-L1, VEGF-A and the SARS-CoV-2 receptor-binding domain. These 45 starting backbones provide a deliberately favorable and biologically grounded test of sequence redesign. They are not an unrestricted sample of protein functions or a fresh end-to-end design campaign."
      },
      {
        "type": "paragraph",
        "text": "The authors compare 222 new non-watermarked designs with 267 designs from each of two watermarking settings, alongside parent binders and negative controls. After expression, surface plasmon resonance measures binding. The study obtains low-nanomolar binders for the viral receptor-binding domain and subnanomolar binders for PD-L1 and VEGF-A. These are successful examples within the experiment, rather than the performance of every candidate."
      },
      {
        "type": "paragraph",
        "text": "The reported affinity distributions do not differ significantly between either watermarked group and the non-watermarked comparator. At the tighter hit-rate thresholds, at or below 100 nM, the study likewise finds no significant difference. There is an important exception: at the broader 1 micromolar threshold, the non-distortionary group has a lower hit rate, with 155 of 267 designs compared with 150 of 222 non-watermarked designs."
      },
      {
        "type": "paragraph",
        "text": "A careful conclusion is that watermarked binders retained measured binding activity, with broadly comparable affinity distributions in this selected three-target experiment. A nonsignificant difference does not establish exact equivalence. Binding also leaves many other properties untested, including catalytic activity, cellular efficacy, toxicity, immunogenicity and long-term stability. The evidence is strongest when the claim remains close to what was measured."
      },
      {
        "type": "link",
        "text": "Experimental evidence: Figure 2 and the protein expression and binding methods",
        "href": "https://www.nature.com/articles/s41586-026-10965-y"
      },
      {
        "type": "heading",
        "text": "Why 100% detection needs a denominator"
      },
      {
        "type": "paragraph",
        "text": "The sequence pipeline adds a useful engineering step: it retains candidates only if they pass both design-quality filters and a watermark-detectability threshold. The reported 100% sequence detection rate applies to that selected output. Detection is part of the acceptance criterion. Without this extra filter, sensitivity varies across settings."
      },
      {
        "type": "paragraph",
        "text": "That distinction changes how we would evaluate a service using the method. We would want to know how many candidates were generated, how many passed the structural filters, how many passed the watermark filter, and how many ultimately worked in an assay. Perfect detection among released candidates can be valuable, but it should travel with the yield and cost required to obtain them."
      },
      {
        "type": "paragraph",
        "text": "False positives require equal attention. A 0.1% false-positive rate corresponds to roughly one false flag per thousand unwatermarked inputs under the relevant calibration conditions. It does not make each positive result 99.9% certain. As a simple illustration, screening a million genuinely unwatermarked inputs would produce about a thousand false flags if that rate held. The reliability of a positive call also depends on how common the watermark is in the screened population."
      },
      {
        "type": "paragraph",
        "text": "Calibration is therefore part of the method’s scientific validity. The authors use nearly 3.5 million natural and non-watermarked sequences, including short natural fragments. Their supplementary analyses show why the length and unit of testing matter: a threshold calibrated on complete sequences can behave differently when applied to short windows. We would need to validate a detector on the actual objects and transformations in the intended workflow."
      },
      {
        "type": "link",
        "text": "Detection, output selection and calibration: Figure 3 in the paper",
        "href": "https://www.nature.com/articles/s41586-026-10965-y"
      },
      {
        "type": "link",
        "text": "Further detail: Supplementary Information, sections A.2 and A.7",
        "href": "https://media.springernature.com/original/springer-static/esm/art%3A10.1038%2Fs41586-026-10965-y/MediaObjects/41586_2026_10965_MOESM1_ESM.pdf"
      },
      {
        "type": "heading",
        "text": "A useful signal still has a maintenance cost"
      },
      {
        "type": "paragraph",
        "text": "The paper examines robustness rather than assuming that the watermark is permanent. Some tested changes preserve detectability, while other transformations can remove it. For sequences, estimates of the biological consequences of removal combine current and historical data; they are not a comprehensive new wet-lab validation of every modified output. A practical deployment would need to establish which ordinary processing steps preserve a useful signal."
      },
      {
        "type": "paragraph",
        "text": "The computational cost also depends on which part of the pipeline we count. Stricter sequence-watermark filtering is relatively cheap in the authors’ cost model because it happens before expensive structure evaluation. Yet producing a design that passes the full pipeline still costs more than the unwatermarked baseline. Those are modeled computational costs under specified assumptions, not all-in laboratory costs or a production price list. The structure method has a separate training cost; the authors report no additional structure-inference overhead."
      },
      {
        "type": "link",
        "text": "Robustness and limitations: Results and Discussion in the paper",
        "href": "https://www.nature.com/articles/s41586-026-10965-y"
      },
      {
        "type": "link",
        "text": "Computational cost model: Supplementary Information, sections A.5–A.6",
        "href": "https://media.springernature.com/original/springer-static/esm/art%3A10.1038%2Fs41586-026-10965-y/MediaObjects/41586_2026_10965_MOESM1_ESM.pdf"
      },
      {
        "type": "heading",
        "text": "What does a provenance flag justify?"
      },
      {
        "type": "paragraph",
        "text": "Both schemes detect the presence of a watermark rather than embedding a rich message. With a managed association between a detector and a participating service, the signal can support a claim about provenance. It does not independently identify the person who used that service or reconstruct a complete design history. Explicit metadata remains necessary."
      },
      {
        "type": "paragraph",
        "text": "The distinction is especially important for biological safety. Provenance asks how an object was produced. Functional validation asks what it does under specified conditions. Biosafety and biosecurity assessment address possible harm and appropriate safeguards. A watermark may contribute to a layered screening system, but its presence does not certify safety or replace established screening. The paper discusses possible operating arrangements rather than demonstrating a deployed risk classifier."
      },
      {
        "type": "paragraph",
        "text": "A negative result is also inconclusive about natural origin. It can arise from an unwatermarked tool, subsequent processing, an unsupported input or too little detectable signal. A positive result is statistical evidence that deserves contextual review, particularly when the consequences include rejecting a synthesis request or questioning the integrity of a scientific record."
      },
      {
        "type": "paragraph",
        "text": "For research databases, an immediate value would be preserving the distinction between generated hypotheses and measured evidence when source labels become separated from files. A predicted structure can be scientifically useful while remaining a prediction. Watermarking could supply an additional check; model versions, source labels, processing records and experimental validation still carry essential information."
      },
      {
        "type": "heading",
        "text": "What we would ask before using it"
      },
      {
        "type": "paragraph",
        "text": "The following are proposed evaluation criteria, rather than experiments our lab has performed or deployment results reported by the authors:"
      },
      {
        "type": "list",
        "items": [
          "Keep the objects separate. Link designed sequences, predicted coordinates and experimental measurements without allowing one to stand in for another.",
          "Preserve ordinary provenance. Record the model and version, design stage, filtering decisions and subsequent processing alongside the output.",
          "Validate the detector locally. Use the lengths, object types, transformations and decision units that the real workflow will encounter.",
          "Report the full trade-off. Present sensitivity, false-positive rate, candidate rejection and computational cost together.",
          "Define the response to a flag. Use detection to guide provenance review, with independent functional validation and established safety screening continuing in parallel."
        ]
      },
      {
        "type": "heading",
        "text": "The takeaway"
      },
      {
        "type": "paragraph",
        "text": "SynthIDBio provides a concrete proof of concept: evidence of a generation process can be embedded in protein-design outputs while preserving useful performance in the tested settings. Its strongest contribution is making provenance an experimentally testable design constraint. The next step is to establish how that signal behaves across broader functions, routine processing and real decision systems, where an error has a consequence beyond a benchmark score."
      },
      {
        "type": "paragraph",
        "text": "Reading route: start with Figure 1 for the two mechanisms, Figure 2 for the binding evidence and Figure 3 for selection and detection. Then read the Discussion on scientific integrity and limitations, followed by the supplementary calibration and cost analyses. The circular artwork is an original conceptual illustration; its red positions are explanatory and do not show measured residue contributions or a specific designed binder."
      },
      {
        "type": "link",
        "text": "Read the full open-access paper",
        "href": "https://www.nature.com/articles/s41586-026-10965-y"
      },
      {
        "type": "link",
        "text": "Official software resource: Google DeepMind’s SynthIDBio repository",
        "href": "https://github.com/google-deepmind/synthidbio"
      }
    ]
  },
  {
    "slug": "before-we-trust-spatial-ai",
    "title": "Before we trust spatial AI, we need to trust the cell",
    "date": "2026-09-30",
    "summary": "A critical reading of ResolVI and recent spatial transcriptomics studies: how misplaced RNA can become a biological story, what probabilistic AI can correct, and how to validate the result.",
    "status": "published",
    "image": {
      "src": "/blog-images/before-we-trust-spatial-ai.svg",
      "alt": "Conceptual illustration of two neighboring cells, with RNA dots between a solid cell boundary and a dashed alternative assignment.",
      "width": 600,
      "height": 600
    },
    "body": [
      {
        "type": "paragraph",
        "text": "Consider a T cell sitting against a tumor cell. Its spatial transcriptomic profile contains a small epithelial program. That observation could motivate an interesting biological hypothesis. It could also mean that some tumor transcripts were assigned to the T cell. The two explanations can produce the same attractive figure: a cell state that changes with distance from the tumor."
      },
      {
        "type": "paragraph",
        "text": "For spatial AI, this is a foundational problem. A model trained to predict expression from a cell’s neighborhood may learn the measurement process as well as the biology. ResolVI, published in Nature Methods on 24 September 2026, makes this a timely moment to examine where correction belongs in an analysis, what evidence supports it, and what still requires an experiment."
      },
      {
        "type": "link",
        "text": "This week’s paper: Ergen and Yosef, ResolVI (Nature Methods, 24 September 2026)",
        "href": "https://www.nature.com/articles/s41592-026-03212-9"
      },
      {
        "type": "heading",
        "text": "Why the error can look like a discovery"
      },
      {
        "type": "paragraph",
        "text": "In imaging-based spatial transcriptomics, locating an RNA molecule and deciding which cell owns it are separate steps. A molecular coordinate can be precise while its cell assignment is wrong. At crowded interfaces, an imperfect boundary can mix transcripts from adjacent cells. The resulting error is structured: the contaminating signature comes from the very neighborhood whose influence the experiment aims to measure."
      },
      {
        "type": "paragraph",
        "text": "Mitchel and colleagues tested this problem across tissues and platforms. Their January 2026 Nature Genetics study found that segmentation-related admixture can distort differential expression, neighborhood effects and ligand–receptor inference. They also showed that factorizing local molecular neighborhoods can help identify and remove contaminating components. The important warning is that a spatial association can be generated during quantification, before any downstream biological model is fitted."
      },
      {
        "type": "link",
        "text": "Evidence: Mitchel et al., Impact and correction of segmentation errors in spatial transcriptomics (20 January 2026)",
        "href": "https://www.nature.com/articles/s41588-025-02497-4"
      },
      {
        "type": "paragraph",
        "text": "Here is the implication for AI evaluation: accurate prediction of the observed matrix is an incomplete success criterion. If the matrix contains reproducible neighborhood-dependent contamination, predicting that contamination can improve a score. Holding out cells from the same tissue does not, by itself, distinguish a learned biological response from a learned measurement artifact. This is an inference from the measurement problem, rather than a reported benchmark result for every spatial model."
      },
      {
        "type": "heading",
        "text": "How ResolVI represents the problem"
      },
      {
        "type": "paragraph",
        "text": "ResolVI starts after segmentation, with cell-level counts, spatial positions and sample information. Its generative model explains observed RNA through three contributions: expression attributed to the cell, expression misassigned from nearby cells, and nonspecific background. A neural encoder compresses expression into a latent cell state; a decoder generates expression profiles from that state. Variational inference estimates model parameters and an approximate posterior over hidden quantities."
      },
      {
        "type": "paragraph",
        "text": "The latent prior is a mixture of Gaussians, allowing multiple modes rather than one undifferentiated cloud. Neighbor contributions are weighted, and the model can incorporate cell-type labels in a semisupervised setting. Its output includes corrected expression estimates and a representation for downstream analysis. These are conditional estimates under a model; the original molecules have not been experimentally remeasured."
      },
      {
        "type": "link",
        "text": "Technical reference: ResolVI model and inference in scvi-tools 1.5.1",
        "href": "https://docs.scvi-tools.org/en/1.5.1/user_guide/models/resolvi.html"
      },
      {
        "type": "paragraph",
        "text": "The useful AI idea here is explicit modeling of how measurements become contaminated. It gives the analysis quantities to inspect beyond an embedding: how much of each cell’s signal is attributed to local admixture, how much to background, and where those estimates concentrate in the tissue. A visually cleaner map is only one possible consequence."
      },
      {
        "type": "heading",
        "text": "What the new paper actually establishes"
      },
      {
        "type": "paragraph",
        "text": "Ergen and Yosef evaluate ResolVI across imaging- and sequencing-based datasets. One mouse-brain Xenium example contains approximately 130,000 cells and a 248-gene panel; a human-liver CosMx analysis contains 1.2 million cells and 1,000 genes. They report reduced implausible marker co-expression, improved cell-type resolution and integration, and downstream analyses of tumor and inflammatory niches."
      },
      {
        "type": "paragraph",
        "text": "These results support the value of modeling contamination at useful scale. They do not supply molecule-by-molecule ground truth. The authors explicitly discuss context dependence in marker-based benchmarks, dependence on initial segmentation quality, and sensitivity to the latent representation. The strongest reading is therefore evidence of improved analysis in the tested settings, with assumptions that remain relevant in a new tissue."
      },
      {
        "type": "link",
        "text": "Read the results and limitations in the ResolVI paper",
        "href": "https://www.nature.com/articles/s41592-026-03212-9"
      },
      {
        "type": "heading",
        "text": "Three approaches to the same problem"
      },
      {
        "type": "paragraph",
        "text": "Correction is not a single interchangeable operation. Proseg acts on segmentation itself. In the 2025 study by Jones and colleagues, a probabilistic approach inspired by cell simulation adjusts plausible cell shapes to explain transcript locations. It works upstream of the final cell-by-gene matrix, changing the assignment on which later analysis depends."
      },
      {
        "type": "link",
        "text": "Upstream approach: Jones et al., Cell simulation as cell segmentation (22 May 2025)",
        "href": "https://www.nature.com/articles/s41592-025-02697-0"
      },
      {
        "type": "paragraph",
        "text": "A second approach is to decompose already mixed cell profiles. Bilous and colleagues studied more than 40 breast and lung tumor sections and introduced SPLIT in April 2026. It uses reference-informed cell-type mixtures to separate signals. Their multiplexed protein staining provides an independent check on cell identity, and their analysis includes cases in which tumor-associated contamination confuses transcript-based annotation."
      },
      {
        "type": "paragraph",
        "text": "A particularly instructive example concerns cycling tumor cells missing from a reference. Such cells can look like tumor profiles mixed with cycling lymphocytes. SPLIT offers an optional, spatially selective decomposition mode that uses neighborhood evidence to help avoid correcting away that phenotype. The broader lesson is that a reference can make correction more informative while also creating a vulnerability when the relevant state is absent. Their benchmark also found cases in which ResolVI suppressed T-cell programs along with contamination. This earlier comparison used the implementation available to that study; it is evidence of a context-dependent failure mode, rather than a universal ranking of the September publication."
      },
      {
        "type": "link",
        "text": "Reference-informed approach: Bilous et al., Resolving sensitivity, specificity and signal contamination in Xenium spatial transcriptomics (30 April 2026)",
        "href": "https://www.nature.com/articles/s41592-026-03089-8"
      },
      {
        "type": "paragraph",
        "text": "ResolVI adds a third route: jointly estimating latent cell states and nuisance contributions. These approaches differ in inputs and assumptions, with partly overlapping correction mechanisms. Some combinations can be useful, but require validation. For a particular experiment, their disagreement is useful diagnostic information. Automatically applying every correction in sequence would make it harder to identify which assumption changed the biological conclusion."
      },
      {
        "type": "heading",
        "text": "A practical test before believing a neighborhood effect"
      },
      {
        "type": "paragraph",
        "text": "The following is a proposed validation workflow, not an experiment reported in the papers above. Suppose the biological claim is that proximity to tumor cells changes a T-cell program. Define the program and the proximity comparison before optimizing correction. Then ask whether the same conclusion survives reasonable alternatives in measurement and analysis."
      },
      {
        "type": "list",
        "items": [
          "Preserve the evidence. Keep molecule coordinates, images, segmentation masks and the original count matrix. Store inferred expression separately, with software versions and parameters.",
          "Inspect the disputed interface. Examine individual molecules and boundaries where the effect is strongest. Ask whether the relevant transcripts lie throughout the cell or cluster along a neighboring compartment.",
          "Compare analysis branches. Run the original assignment, an alternative segmentation and a justified correction method. Track effect direction and magnitude, cell counts, and which cells change identity.",
          "Challenge rare states. Deliberately inspect low-frequency and transitional populations. Require supporting markers or another measurement before deciding that an unusual combination is contamination.",
          "Test across biological replicates. Use donor- or specimen-level comparisons for claims intended to generalize across people or samples. Large cell numbers do not replace independent specimens.",
          "Use an independent readout. Protein staining, another imaging assay or a targeted perturbation can test the specific claim. A ligand and receptor in adjacent profiles are insufficient evidence of an active causal signal."
        ]
      },
      {
        "type": "paragraph",
        "text": "A convincing outcome would be a spatial effect that remains interpretable across analysis branches and is supported by an independent measurement. If the result appears only after one aggressive correction, the immediate output should be a hypothesis with a clear dependency on that method. If it disappears, inspect the affected molecules before concluding that the original biology was false."
      },
      {
        "type": "heading",
        "text": "What this changes for automation"
      },
      {
        "type": "paragraph",
        "text": "Automated spatial workflows need quality gates that reflect this ambiguity. Plummer and colleagues’ cross-site study of imaging-based assays is useful here: it shows why metrics must be interpreted in the context of tissue, platform and panel. Transcript yield, specificity and assignment quality answer different questions. A single summary score cannot safely stand in for all three."
      },
      {
        "type": "link",
        "text": "Benchmarking context: Plummer et al., Standardized metrics for assessment and reproducibility of imaging-based spatial transcriptomics datasets (online 3 December 2025)",
        "href": "https://www.nature.com/articles/s41587-025-02811-9"
      },
      {
        "type": "paragraph",
        "text": "An actionable automation design would generate a paired report for every sample: original and inferred expression, a tissue map of estimated contamination, cells whose annotation changed, and biological effects that changed sign or disappeared. Thresholds should be calibrated for the assay and question, with flagged cases routed to review. This is an engineering recommendation, not a validated universal standard."
      },
      {
        "type": "paragraph",
        "text": "The same discipline should carry into model training. Record which segmentation and correction produced each training matrix. Evaluate on held-out specimens. Include uncorrected and alternative-processing baselines. Ask whether performance gains persist on independent measurements or experimentally defined outcomes. Otherwise, a model and its preprocessing pipeline may be validating one another."
      },
      {
        "type": "heading",
        "text": "The takeaway"
      },
      {
        "type": "paragraph",
        "text": "Spatial AI becomes more scientifically useful when it makes the measurement process visible. ResolVI provides one concrete way to do that; the segmentation and benchmarking studies explain why it matters. For technology development, the next question is practical: which biological conclusions remain stable when plausible explanations for measurement error are allowed to compete? That is a more informative target than a cleaner embedding alone."
      },
      {
        "type": "paragraph",
        "text": "Reading route: start with ResolVI Figure 1 for the model, then its Discussion for the assumptions. Read the segmentation-error study for failure modes, the SPLIT study for independent identity checks, and the cross-site metrics study for quality-control design. All research articles linked here are peer-reviewed publications; the software documentation is a separate technical resource. Literature checked on 30 September 2026."
      }
    ]
  }
];

export const editorialCollections = {
  news: {
    title: "News",
    kicker: "From the lab",
    description: "Research updates, publications, and milestones as the lab takes shape.",
    emptyTitle: "The next chapter is taking shape.",
    emptyCopy: "There are no news updates yet. Research updates and milestones will appear here when there is something to share.",
    archiveLink: "View all news",
    entryLabel: "news update",
  },
  blog: {
    title: "Blog",
    kicker: "Ideas in progress",
    description: "Notes on biological questions, technology, and the process of building new tools.",
    emptyTitle: "Room for ideas to grow.",
    emptyCopy: "There are no blog posts yet. Notes on science, methods, and building new tools will appear here.",
    archiveLink: "View the blog",
    entryLabel: "blog post",
  },
} as const;

function requireText(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Editorial content: ${field} must be nonempty text.`);
  }
}

/** Links may point to HTTPS sources or a site path without the deployment prefix. */
export function isSafeEditorialLink(href: string): boolean {
  if (typeof href !== "string" || /[\\\s]/u.test(href) ||
    Array.from(href).some((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)) return false;
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  try {
    const url = new URL(href);
    return url.protocol === "https:" && Boolean(url.hostname) && !url.username && !url.password;
  } catch {
    return false;
  }
}

function validateBlock(block: EditorialBlock, entry: string, index: number): void {
  const field = `${entry}.body[${index}]`;
  if (!block || typeof block !== "object") throw new Error(`Editorial content: invalid ${field}.`);
  switch (block.type) {
    case "paragraph":
    case "heading":
      requireText(block.text, `${field}.text`);
      return;
    case "quote":
      requireText(block.text, `${field}.text`);
      if (block.attribution !== undefined) requireText(block.attribution, `${field}.attribution`);
      return;
    case "list":
      if (!Array.isArray(block.items) || block.items.length === 0) {
        throw new Error(`Editorial content: ${field}.items must contain at least one item.`);
      }
      block.items.forEach((item, itemIndex) => requireText(item, `${field}.items[${itemIndex}]`));
      if (block.ordered !== undefined && typeof block.ordered !== "boolean") {
        throw new Error(`Editorial content: ${field}.ordered must be a boolean.`);
      }
      return;
    case "link":
      requireText(block.text, `${field}.text`);
      if (!isSafeEditorialLink(block.href)) {
        throw new Error(`Editorial content: ${field}.href must be an HTTPS URL or a site-relative path.`);
      }
      return;
    default:
      throw new Error(`Editorial content: unsupported block type in ${field}.`);
  }
}

/** Validate all entries, including drafts, so authoring mistakes fail the build. */
export function validateEditorialEntries(entries: readonly EditorialEntry[]): void {
  const slugs = new Set<string>();
  for (const entry of entries) {
    requireText(entry.slug, "slug");
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)) {
      throw new Error(`Editorial content: invalid slug "${entry.slug}". Use lowercase words separated by hyphens.`);
    }
    if (slugs.has(entry.slug)) throw new Error(`Editorial content: duplicate slug "${entry.slug}".`);
    slugs.add(entry.slug);
    requireText(entry.title, `${entry.slug}.title`);
    requireText(entry.summary, `${entry.slug}.summary`);
    if (entry.author !== undefined) requireText(entry.author, `${entry.slug}.author`);
    if (entry.image !== undefined) {
      const image = entry.image;
      if (!image || typeof image !== "object" || typeof image.src !== "string" || /\s/.test(image.src) ||
        !/^(?:\/news-images\/[a-z0-9]+(?:-[a-z0-9]+)*\.(?:png|jpe?g|webp)|\/blog-images\/[a-z0-9]+(?:-[a-z0-9]+)*\.(?:svg|png|jpe?g|webp))$/.test(image.src)) {
        throw new Error(`Editorial content: ${entry.slug}.image.src must be a local photo in /news-images/ or illustration in /blog-images/.`);
      }
      requireText(image.alt, `${entry.slug}.image.alt`);
      for (const field of ["width", "height"] as const) {
        if (!Number.isInteger(image[field]) || image[field] < 1 || image[field] > 10000) {
          throw new Error(`Editorial content: ${entry.slug}.image.${field} must be a positive integer up to 10000.`);
        }
      }
    }
    const timestamp = Date.parse(`${entry.date}T00:00:00.000Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date) || !Number.isFinite(timestamp) ||
      new Date(timestamp).toISOString().slice(0, 10) !== entry.date) {
      throw new Error(`Editorial content: ${entry.slug}.date must be a real date in YYYY-MM-DD format.`);
    }
    if (entry.status !== "draft" && entry.status !== "published") {
      throw new Error(`Editorial content: ${entry.slug}.status must be "draft" or "published".`);
    }
    if (!Array.isArray(entry.body) || entry.body.length === 0) {
      throw new Error(`Editorial content: ${entry.slug}.body must contain at least one block.`);
    }
    entry.body.forEach((block, index) => validateBlock(block, entry.slug, index));
  }
}

/** A new array, newest first; never mutates the authoring source. */
export function selectPublishedEntries(entries: readonly EditorialEntry[]): readonly EditorialEntry[] {
  validateEditorialEntries(entries);
  return entries.filter((entry) => entry.status === "published").sort((a, b) => {
    if (a.date !== b.date) return a.date > b.date ? -1 : 1;
    return a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0;
  });
}

const publishedEntries: Record<EditorialKind, readonly EditorialEntry[]> = {
  news: selectPublishedEntries(newsEntries),
  blog: selectPublishedEntries(blogEntries),
};

export function getPublishedEntries(kind: EditorialKind): readonly EditorialEntry[] {
  return publishedEntries[kind];
}

export function getPublishedEntry(kind: EditorialKind, slug: string): EditorialEntry | undefined {
  return getPublishedEntries(kind).find((entry) => entry.slug === slug);
}

export function editorialPath(kind: EditorialKind, slug?: string): string {
  return assetPath(`/${kind}/${slug ? `${encodeURIComponent(slug)}/` : ""}`);
}

export function formatEditorialDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${date}T00:00:00.000Z`));
}

/** Canonicals always identify the official public site, including in local previews. */
export function getEditorialMetadata(kind: EditorialKind, entry?: EditorialEntry): Metadata {
  const collection = editorialCollections[kind];
  const title = `${entry?.title ?? collection.title} | Technology Innovation Lab`;
  const description = entry?.summary ?? collection.description;
  const canonical = `https://scbtechnologyinnovationlab.github.io/website/${kind}/${entry ? `${encodeURIComponent(entry.slug)}/` : ""}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: entry ? "article" : "website",
      ...(entry ? { publishedTime: `${entry.date}T00:00:00.000Z`, ...(entry.author ? { authors: [entry.author] } : {}) } : {}),
      images: [{
        url: "https://scbtechnologyinnovationlab.github.io/website/og-til-cells-2026-09-30-v2.png",
        width: 1200,
        height: 630,
        alt: "Technology Innovation Lab",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://scbtechnologyinnovationlab.github.io/website/og-til-cells-2026-09-30-v2.png"],
    },
  };
}
