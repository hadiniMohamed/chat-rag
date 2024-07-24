package hadini.rag_ai.config;

import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.transformer.splitter.TextSplitter;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.SimpleVectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Path;
import java.util.List;

@Component
public class RagDataLoader {

    @Value("classpath:/pdfs/cv.pdf")
    private Resource pdfResource;

    @Value("store-cv-v1.json")
    private String storeFile;

    @Bean
    public SimpleVectorStore simpleVectorStore(EmbeddingModel embeddingModel) {
        SimpleVectorStore vectorStore = new SimpleVectorStore(embeddingModel);
        String fileStore = Path.of("src", "main", "resources", "store").toAbsolutePath() + "/" + storeFile;
        File file = new File(fileStore);

        try {
            if (!file.exists()) {
                System.out.println("File does not exist. Reading PDF and processing...");
                PagePdfDocumentReader pdfDocumentReader = new PagePdfDocumentReader(pdfResource);

                List<Document> documents = pdfDocumentReader.get();
                System.out.println("PDF read successfully. Number of documents: " + documents.size());

                TextSplitter textSplitter = new TokenTextSplitter();
                List<Document> chunks = textSplitter.split(documents);
                System.out.println("Text split into chunks. Number of chunks: " + chunks.size());

                vectorStore.accept(chunks);
                vectorStore.save(file);
                System.out.println("Chunks saved to vector store.");
            } else {
                vectorStore.load(file);
                System.out.println("Vector store loaded from file.");
            }
        } catch (Exception e) {
            System.err.println("Error occurred: " + e.getMessage());
        }

        return vectorStore;
    }
}
